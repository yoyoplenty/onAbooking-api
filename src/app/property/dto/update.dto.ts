import { PartialType } from '@nestjs/swagger';

import { CreatePropertyDto } from './create.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}
