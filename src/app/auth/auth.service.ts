import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compareResource, hashResource } from '@on/helpers/password';
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
}
