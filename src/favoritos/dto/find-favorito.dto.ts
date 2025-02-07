import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';
import { paginationDto } from '../../common/dto';

export class FindFavoritoDto extends PartialType(paginationDto) {
  @IsNumber()
  @IsPositive()
  userId: number;
}
