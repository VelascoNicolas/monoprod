import { Module } from '@nestjs/common';
import { SolicitudPresupuestoService } from './solicitud-presupuesto.service';
import { SolicitudPresupuestoController } from './solicitud-presupuesto.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [SolicitudPresupuestoController],
  providers: [SolicitudPresupuestoService],
  exports:[SolicitudPresupuestoService],
  imports:[
    ProductsModule,
  ]
})
export class SolicitudPresupuestoModule {}
