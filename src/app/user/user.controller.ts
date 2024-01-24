import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';

import { QueryUserDto } from './dto/query-user.dto';
import { User } from './model/user.model';
import { UserService } from './user.service';

@ApiTags('User')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get users',
    description: 'Allows admin get users',
  })
  @ApiOkResponse({ description: 'Get users successful ', type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findUsers(@Res() res: Response, @Query() query: QueryUserDto): Promise<ResponseDTO> {
    try {
      const response = await this.userService.find(query);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
