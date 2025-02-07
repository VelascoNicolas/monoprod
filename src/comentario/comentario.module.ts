import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { FavoritosModule } from '../favoritos/favoritos.module';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [ComentarioController],
  providers: [ComentarioService, ProductsService],
  imports: [
    ComentarioModule,
    FavoritosModule,
  ],
  exports: [ComentarioService],
})
export class ComentarioModule {}
