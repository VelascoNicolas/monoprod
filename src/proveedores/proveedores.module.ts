import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';

@Module({
  controllers: [ProveedoresController],
  providers: [ProveedoresService],
  exports:[ProveedoresService]
})
export class ProveedoresModule {}
