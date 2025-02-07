import { Module } from '@nestjs/common';
import { PresupuestoService } from './presupuesto.service';
import { PresupuestoController } from './presupuesto.controller';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { ProductsModule } from '../products/products.module';
import { SolicitudPresupuestoModule } from '../solicitud-presupuesto/solicitud-presupuesto.module';

@Module({
  controllers: [PresupuestoController],
  providers: [PresupuestoService],
  imports:[
    ProveedoresModule,
    ProductsModule,
    SolicitudPresupuestoModule
  ]
})
export class PresupuestoModule {}
