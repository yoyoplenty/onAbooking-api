import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { User } from '@on/decorators/user.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
// import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { UserDocument } from '../user/model/user.model';

import { AccountService } from './account.service';

@ApiTags('Account')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User makes a account',
    description: 'Allows users make a property account',
  })
  @ApiOkResponse({ description: 'Account successful ', type: ApiResponseDTO })
  @UseGuards(JwtAuthGuard)
  @Post()
  async Book(
    // @Body() accountPayload: any,
    @User() user: UserDocument,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.accountService.book(user);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
