import { Module } from '@nestjs/common';
import { DescripcionService } from './descripcion.service';
import { DescripcionController } from './descripcion.controller';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [DescripcionController],
  providers: [DescripcionService, ProductsService],
})
export class DescripcionModule {}
