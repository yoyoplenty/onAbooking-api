import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { Roles } from '@on/decorators/roles.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';

import { QueryUserDto } from './dto/query.dto';
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
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findUsers(@Res() res: Response, @Query() query: QueryUserDto): Promise<ResponseDTO> {
    try {
      const filter = requestFilter(query);

      const response = await this.userService.find(filter);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
