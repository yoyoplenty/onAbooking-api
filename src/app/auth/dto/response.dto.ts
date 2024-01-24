import { ApiProperty } from '@nestjs/swagger';

import { User } from '@on/app/user/model/user.model';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';

export class UserTokenDto extends ApiResponseDTO {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty()
  token: string;
}
