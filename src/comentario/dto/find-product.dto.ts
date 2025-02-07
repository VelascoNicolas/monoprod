import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';
import { paginationDto } from '../../common/dto';

export class FindProductDto extends PartialType(paginationDto) {
  @IsNumber()
  @IsPositive()
  productId: number;
}
