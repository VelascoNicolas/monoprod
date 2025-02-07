import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriaModule } from './categoria/categoria.module';
import { TipoProductoModule } from './tipo-producto/tipo-producto.module';
import { PrecioFullSaludModule } from './precio-full-salud/precio-full-salud.module';
import { FavoritosModule } from './favoritos/favoritos.module';
import { ComentarioModule } from './comentario/comentario.module';
import { DescripcionModule } from './descripcion/descripcion.module';

import { TiposUsoModule } from './tipos-uso/tipos-uso.module';
import { ImagenModule } from './imagen/imagen.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { RecetaModule } from './receta/receta.module';
import { SolicitudPresupuestoModule } from './solicitud-presupuesto/solicitud-presupuesto.module';
import { PresupuestoModule } from './presupuesto/presupuesto.module';

@Module({
  imports: [
    ProductsModule,
    CategoriaModule,
    TipoProductoModule,
    PrecioFullSaludModule,
    DescripcionModule,
    FavoritosModule,
    ComentarioModule,
    TiposUsoModule,
    ImagenModule,
    ProveedoresModule,
    RecetaModule,
    SolicitudPresupuestoModule,
    PresupuestoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
