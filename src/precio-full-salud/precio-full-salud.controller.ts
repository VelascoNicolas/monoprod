import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PrecioFullSaludService } from './precio-full-salud.service';
import { CreatePrecioFullSaludDto } from './dto/create-precio-full-salud.dto';
import { UpdatePrecioFullSaludDto } from './dto/update-precio-full-salud.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('precio-full-salud')
@ApiTags('PrecioFullSalud')
export class PrecioFullSaludController {
  constructor(private readonly precioFullSaludService: PrecioFullSaludService) {}

  @Post()
  create(@Body() createPrecioFullSaludDto: CreatePrecioFullSaludDto) {
    return this.precioFullSaludService.create(createPrecioFullSaludDto);
  }

  @Get()
  findAll() {
    return this.precioFullSaludService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.precioFullSaludService.findOne(+id);
  }

  @Patch()
  update(@Body() updatePrecioFullSaludDto: UpdatePrecioFullSaludDto) {
    return this.precioFullSaludService.update(updatePrecioFullSaludDto.id, updatePrecioFullSaludDto);
  }

  @Delete(':id')
  remove(@Body('id', ParseIntPipe) id: number) {
    return this.precioFullSaludService.remove(+id);
  }

  @Patch('/available/:id')
  enable(@Param('id', ParseIntPipe) id: number) {
    return this.precioFullSaludService.makeAvailable(+id);
  }
}
