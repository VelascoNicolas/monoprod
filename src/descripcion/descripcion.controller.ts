import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { DescripcionService } from './descripcion.service';
import { UpdateDescripcionDto } from './dto/update-descripcion.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('descripcion')
@ApiTags('Descripcion')
export class DescripcionController {
  constructor(private readonly descripcionService: DescripcionService) {}

  // @MessagePattern('createDescripcion')
  // create(@Payload() createDescripcionDto: CreateDescripcionDto) {
  //   return this.descripcionService.create(createDescripcionDto);
  // }

  // @MessagePattern('findAllDescripcion')
  // findAll() {
  //   return this.descripcionService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.descripcionService.findOne(+id);
  }

  @Patch()
  update(
    @Body() updateDescripcionDto: UpdateDescripcionDto) {
      return this.descripcionService.update(
        updateDescripcionDto.id, updateDescripcionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.descripcionService.remove(id);
  }

 @Patch(':id')
  makeAvailable(@Param('id', ParseIntPipe) id: number) {
    return this.descripcionService.makeAvailable(id);
  }
  

}
