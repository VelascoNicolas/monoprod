import { Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [FavoritosController],
  providers: [FavoritosService],
  imports: [
    ProductsModule
  ],
  exports: [FavoritosService],
})
export class FavoritosModule {}
