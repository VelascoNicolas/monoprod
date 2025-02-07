import { Module } from '@nestjs/common';
import { PrecioFullSaludService } from './precio-full-salud.service';
import { PrecioFullSaludController } from './precio-full-salud.controller';

@Module({
  controllers: [PrecioFullSaludController],
  providers: [PrecioFullSaludService],
})
export class PrecioFullSaludModule {}
