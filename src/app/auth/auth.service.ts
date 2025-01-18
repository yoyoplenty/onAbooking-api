import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ROLE, TOKEN_TYPE, USER_STATUS } from '@on/enums';
import { getRandomNumber } from '@on/helpers';
import { compareResource, hashResource } from '@on/helpers/password';
import { smsService } from '@on/services/sms/sms.service';
import { PhoneEmailDto } from '@on/utils/dto/shared.dto';
import { ServiceResponse } from '@on/utils/types';

import { User } from '../user/model/user.model';
import { UserRepository } from '../user/repository/user.repository';
import { WalletRepository } from '../user/repository/wallet.repository';
import { TokenRepository } from '../user/repository/wallet.repository copy';

import { CompleteRegistrationDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto/auth.dto';
import { EmailVerificationDto, PhoneVerificationDto } from './dto/otp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly sms: smsService,
    private readonly user: UserRepository,
    private readonly token: TokenRepository,
    private readonly wallet: WalletRepository,
  ) {}

  public async register(registerPayload: RegisterDto): Promise<ServiceResponse> {
    const { country, countryCode, phoneNumber, email, role = ROLE.GUEST } = registerPayload;

    const userExists = phoneNumber
      ? await this.user.findOne({ countryCode, phoneNumber })
      : email
        ? await this.user.findOne({ email })
        : null;

    if (userExists) {
      if (phoneNumber && !userExists.isPhoneVerified) {
        await this.sendOTP(TOKEN_TYPE.PHONE, userExists);
        throw new ConflictException('User exists, verification OTP sent successfully.');
      }

      if (email && !userExists.isEmailVerified) {
        await this.sendOTP(TOKEN_TYPE.EMAIL, userExists);
        throw new ConflictException('User exists, verification email sent successfully.');
      }

      throw new ConflictException('User already exists');
    }

    const userPayload = { country, role, ...registerPayload };

    const user = await this.user.create(userPayload);

    phoneNumber ? await this.sendOTP(TOKEN_TYPE.PHONE, user) : await this.sendOTP(TOKEN_TYPE.EMAIL, user);

    return { data: user, message: 'User registered successfully. OTP sent for verification.' };
  }

  public async resendVerification(payload: PhoneEmailDto): Promise<ServiceResponse> {
    await this.sendVerification(payload);

    return { data: null, message: 'Verification otp sent' };
  }

  public async completeRegister(payload: CompleteRegistrationDto): Promise<ServiceResponse> {
    const { countryCode, phoneNumber, password } = payload;

    const user = await this.user.findOne({ countryCode, phoneNumber });

    if (!user) throw new NotFoundException('user not found');
    if (user.role === ROLE.HOST) await this.wallet.upsert({ userId: user._id }, {});

    if (!user.isPhoneVerified) {
      await this.sendOTP(TOKEN_TYPE.PHONE, user);
      throw new NotFoundException('User phone not verified, Verification OTP sent successfully.');
    }

    const updatePayload = {
      ...payload,
      status: USER_STATUS.ACTIVE,
      password: await hashResource(password),
    };

    await this.user.updateById(user._id, updatePayload);

    await this.sendOTP(TOKEN_TYPE.EMAIL, user);

    return { data: user, message: 'Registration completed successfully. OTP sent to email for verification.' };
  }

  public async signIn(signInPayload: LoginDto): Promise<ServiceResponse> {
    const { email, password, countryCode, phoneNumber } = signInPayload;

    const isPhoneVerification = countryCode && phoneNumber;
    const query = isPhoneVerification ? { countryCode, phoneNumber } : { email };

    const user = await this.user.findOne(query);
    if (!user) throw new NotFoundException('user not found');

    const isValidPassword: boolean = await compareResource(password, user.password);
    if (!isValidPassword) throw new BadRequestException('Incorrect email / username and password combination');

    user.password = undefined;

    const token = this.jwt.sign(user.toJSON());

    return { data: { user, token }, message: 'Login Successful' };
  }

  public async phoneVerification(payload: PhoneVerificationDto): Promise<ServiceResponse> {
    const { countryCode, phoneNumber, token } = payload;

    const query = { countryCode, phoneNumber };

    return this.genericVerification(token, query, TOKEN_TYPE.PHONE);
  }

  public async emailVerification(payload: EmailVerificationDto): Promise<ServiceResponse> {
    const { email, token } = payload;

    const query = { email };

    return this.genericVerification(token, query, TOKEN_TYPE.EMAIL);
  }

  public async forgotPassword(payload: PhoneEmailDto): Promise<ServiceResponse> {
    await this.sendVerification(payload);

    return { data: null, message: `A password reset pin has been sent to your email.` };
  }

  public async resetPassword(payload: ResetPasswordDto): Promise<ServiceResponse> {
    const { token, newPassword, countryCode, phoneNumber, email } = payload;

    const isPhoneVerification = countryCode && phoneNumber;
    const query = isPhoneVerification ? { countryCode, phoneNumber } : { email };

    const user = await this.user.findOne(query);
    if (!user) throw new NotFoundException('user not found');

    const type = isPhoneVerification ? TOKEN_TYPE.PHONE : TOKEN_TYPE.EMAIL;

    await this.verifyOtp({ token, type, user });

    const password: string = await hashResource(newPassword);
    await this.user.updateById(user._id, { password });

    return { data: null, message: 'Password has been reset successfully' };
  }

  private async sendVerification(payload: PhoneEmailDto): Promise<ServiceResponse> {
    const { countryCode, phoneNumber, email } = payload;

    const isPhoneVerification = countryCode && phoneNumber;
    const query = isPhoneVerification ? { countryCode, phoneNumber } : { email };

    const user = await this.user.findOne(query);
    if (!user) throw new NotFoundException('user not found');

    const verificationType = isPhoneVerification ? 'Phone' : 'Email';

    const isAlreadyVerified = isPhoneVerification ? user.isPhoneVerified : user.isEmailVerified;
    if (isAlreadyVerified) throw new BadRequestException(`${verificationType} has already been verified`);

    const tokenType = isPhoneVerification ? TOKEN_TYPE.PHONE : TOKEN_TYPE.EMAIL;

    await this.sendOTP(tokenType, user);

    return null;
  }

  private async sendOTP(type: TOKEN_TYPE, user: User): Promise<ServiceResponse> {
    const token = String(getRandomNumber());

    try {
      await this.token.deleteMany({ userId: user._id, type });

      const tokenPayload = {
        userId: user._id,
        type,
        token,
      };

      await this.token.create(tokenPayload);

      type === TOKEN_TYPE.PHONE ? await this.sms.sendVerificationMessage(user, token) : null;

      return { data: null, message: 'OTP sent successfully' };
    } catch (error) {
      console.error('Error generating or sending OTP:', error);
      throw new Error('Failed to send OTP. Please try again later.');
    }
  }

  private async verifyOtp({ token, type, user }): Promise<void> {
    if (user.isVerified === true) throw new BadRequestException('User has already been verified. Please Login');

    const tokenExists = await this.token.findOne({ type, token, userId: user.id });
    if (!tokenExists) throw new NotFoundException('Token not found');

    const now = new Date();
    if (tokenExists.expireAt < now) throw new BadRequestException('Token has expired');

    await this.token.deleteById(tokenExists._id);
  }

  private async genericVerification(
    token: string,
    query: Record<string, any>,
    type: TOKEN_TYPE,
  ): Promise<ServiceResponse> {
    const user = await this.user.findOne(query);
    if (!user) throw new NotFoundException('Token not found');

    const otpVerificationPayload = {
      user,
      token,
      type,
    };

    await this.verifyOtp(otpVerificationPayload);

    const key = type === TOKEN_TYPE.PHONE ? 'isPhoneVerified' : 'isEmailVerified';

    await this.user.updateById(user._id, { [key]: true });

    return { data: null, message: 'Verification Successful' };
  }
}
