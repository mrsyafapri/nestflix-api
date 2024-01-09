import { PartialType } from '@nestjs/mapped-types';
import { CreateCastDto } from './create-cast.dto';

export class UpdateCastDto extends PartialType(CreateCastDto) {}
