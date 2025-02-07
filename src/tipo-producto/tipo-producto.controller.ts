import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TipoProductoService } from './tipo-producto.service';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { UpdateTipoProductoDto } from './dto/update-tipo-producto.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tipo-producto')
@ApiTags('TipoProducto')
export class TipoProductoController {
  constructor(private readonly tipoProductoService: TipoProductoService) {}

  @Post()
  create(@Body() createTipoProductoDto: CreateTipoProductoDto) {
    return this.tipoProductoService.create(createTipoProductoDto);
  }

  @Get()
  findAll() {
    console.log('microservicio get all tipo productos iniciar')
    return this.tipoProductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('controller find one tipo producto with id: ', id)
    return this.tipoProductoService.findOne(id);
  }

  @Patch(':id')
  update(@Body() updateTipoProductoDto: UpdateTipoProductoDto) {
    return this.tipoProductoService.update(updateTipoProductoDto.id, updateTipoProductoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tipoProductoService.remove(id);
  }

  @Patch('/enable/:id')
  updateToAvailable(@Param('id', ParseIntPipe) id: number) {
    return this.tipoProductoService.updateToAvailable(id);
  }

}
