import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsPositive } from 'class-validator';
import { paginationDto } from '../../common/dto';

export class FindAllbyUserDto extends PartialType(paginationDto) {
  @IsInt()
  @IsPositive()
  userId: number;
}
