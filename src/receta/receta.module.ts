import { Module } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { RecetaController } from './receta.controller';
import { FavoritosModule } from '../favoritos/favoritos.module';
import { FavoritosService } from '../favoritos/favoritos.service';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [RecetaController],
  providers: [RecetaService, FavoritosService],
  imports: [
    FavoritosModule,
    ProductsModule,
  ],
})
export class RecetaModule {}
