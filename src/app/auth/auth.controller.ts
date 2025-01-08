import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { PhoneEmailDto } from '@on/utils/dto/shared.dto';
import { ResponseDTO } from '@on/utils/types';

import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ResetPasswordDto, CompleteRegistrationDto } from './dto/auth.dto';
import { EmailVerificationDto, PhoneVerificationDto } from './dto/otp.dto';
import { UserTokenDto } from './dto/response.dto';

@ApiTags('Auth')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User Registers',
    description: 'Allows new users to register',
  })
  @ApiOkResponse({ description: 'User successful registration', type: ApiResponseDTO })
  @Post('register')
  async register(@Body() registerPayload: RegisterDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.authService.register(registerPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'User Completes Registration',
    description: 'Allows new users complete their registration',
  })
  @ApiOkResponse({ description: 'User registration successful', type: ApiResponseDTO })
  @Post('register/complete')
  async completeRegistration(@Body() payload: CompleteRegistrationDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.authService.completeRegister(payload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'Resend Verification OTP',
    description: 'Endpoint to resend an verification otp to users',
  })
  @ApiOkResponse({ description: 'Resend verification successful', type: ApiResponseDTO })
  @Post('/resend-verification')
  async resendVerification(@Body() payload: PhoneEmailDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.authService.resendVerification(payload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'Login User',
    description: 'Allow user to login',
  })
  @ApiOkResponse({ description: 'User successful login', type: UserTokenDto })
  @Post('login')
  async signIn(@Body() signInPayload: LoginDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.authService.signIn(signInPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'Phone OTP Verification',
    description: 'Allow user to verify phone number OTP',
  })
  @ApiOkResponse({ description: 'User successful verification', type: ApiResponseDTO })
  @Post('verify/phone')
  async phoneVerification(@Body() payload: PhoneVerificationDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.authService.phoneVerification(payload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'Email OTP Verification',
    description: 'Allow user to verify user email',
  })
  @ApiOkResponse({ description: 'User successful verification', type: ApiResponseDTO })
  @Post('verify/email')
  async emailVerification(@Body() payload: EmailVerificationDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.authService.emailVerification(payload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'Forgot Password',
    description: 'Endpoint for forget passwords of all users',
  })
  @ApiOkResponse({ description: 'Forget Password OTP sent', type: ApiResponseDTO })
  @Post('/forgot-password')
  async forgotPassword(@Body() payload: PhoneEmailDto, @Res() res): Promise<ResponseDTO> {
    try {
      const response = await this.authService.forgotPassword(payload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'Reset Password',
    description: 'Endpoint for reset users password',
  })
  @ApiOkResponse({ description: 'Reset Password successful', type: ApiResponseDTO })
  @Post('/reset-password')
  async resetPassword(@Body() payload: ResetPasswordDto, @Res() res): Promise<ResponseDTO> {
    try {
      const response = await this.authService.resetPassword(payload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
