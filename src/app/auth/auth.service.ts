import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compareResource, hashResource } from '@on/helpers/password';
import { EmailRecipient, sendEmail } from '@on/services/email';
import { sharedEmailTemplate } from '@on/services/email/templates/shared.template';
import { ServiceResponse } from '@on/utils/types';

import { UserRepository } from '../user/repository/user.repository';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerPayload: RegisterDto): Promise<ServiceResponse> {
    const { email, phoneNumber } = registerPayload;

    const userExists = await this.user.findOne({ $or: [{ email }, { phoneNumber }] });
    if (userExists) throw new BadRequestException('user already exists');

    registerPayload.password = await hashResource(registerPayload.password);

    const data = await this.user.create(registerPayload);

    const { subject, content, name } = this.generateEmailContent(data);
    const value = sharedEmailTemplate({ subject, content, name });

    const recipient: EmailRecipient = { email: data.email, name: data.firstName };
    await sendEmail({ recipient, value, subject });

    return { data, message: 'user registered successfully' };
  }

  async signIn(signInPayload: LoginDto): Promise<ServiceResponse> {
    const { email, password } = signInPayload;

    const user = await this.user.findOne({ email });
    if (!user) throw new NotFoundException('user not found');

    const isValidPassword: boolean = await compareResource(password, user.password);
    if (!isValidPassword) throw new BadRequestException('Incorrect email / username and password combination');

    user.password = undefined;

    const token = this.jwtService.sign(user.toObject());

    return { data: { user, token }, message: 'Login Successful' };
  }

  private generateEmailContent(user: { lastName: string; email: string }) {
    const subject = `Welcome to OnABooking, ${user.lastName}!<br/>`;

    const content = `
    Welcome to OnABooking! We are delighted to have you with us.<br/>

    At OnABooking, we strive to provide you with the best booking experience for properties around the world. Whether you're planning a vacation or a business trip, we've got you covered.<br/><br/>

    If you have any questions or need assistance, please do not hesitate to contact us.<br/><br/>
  `;

    return { subject, content, name: user.lastName };
  }
}
