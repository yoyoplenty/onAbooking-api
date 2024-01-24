import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
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
}
