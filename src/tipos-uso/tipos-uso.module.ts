import { Module } from '@nestjs/common';
import { TiposUsoService } from './tipos-uso.service';
import { TiposUsoController } from './tipos-uso.controller';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [TiposUsoController],
  providers: [TiposUsoService, ProductsService],
})
export class TiposUsoModule {}
