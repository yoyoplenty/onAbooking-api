import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { User } from '@on/decorators/user.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { isAdmin } from '@on/helpers';
import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { UserDocument } from '../user/model/user.model';

import { QueryTransactionDto } from './dto/query.dto';
import { Transaction } from './model/transaction.model';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Transactions',
    description: 'Allows users get their transactions',
  })
  @ApiOkResponse({ description: 'Get transaction successful ', type: [Transaction] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findTransactions(
    @Res() res: Response,
    @Query() query: QueryTransactionDto,
    @User() user: UserDocument,
  ): Promise<ResponseDTO> {
    try {
      const { offset, limit } = query;

      const filter = requestFilter(query);
      if (!isAdmin(user)) filter['userId'] = user._id;

      const response = await this.transactionService.find(filter, offset, limit);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
