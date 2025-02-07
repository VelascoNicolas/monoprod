import { Module } from '@nestjs/common';
import { ImagenService } from './imagen.service';
import { ImagenController } from './imagen.controller';
import { ProductsModule } from '../products/products.module';
import { FavoritosModule } from '../favoritos/favoritos.module';

@Module({
  controllers: [ImagenController],
  providers: [ImagenService],
  imports: [
    ProductsModule,
    FavoritosModule,
  ],
  exports: [ImagenService],
})
export class ImagenModule {}
