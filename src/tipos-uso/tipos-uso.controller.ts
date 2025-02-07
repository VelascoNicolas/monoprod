import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { TiposUsoService } from './tipos-uso.service';
import { UpdateTiposUsoDto } from './dto/update-tipos-uso.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tipos-uso')
@ApiTags('TiposUso')
export class TiposUsoController {
  constructor(private readonly tiposUsoService: TiposUsoService) {}

  // @MessagePattern('createTiposUso')
  // create(@Payload() createTiposUsoDto: CreateTiposUsoDto) {
  //   return this.tiposUsoService.create(createTiposUsoDto);
  // }

  // @MessagePattern('findAllTiposUso')
  // findAll() {
  //   return this.tiposUsoService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tiposUsoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Body() updateTiposUsoDto: UpdateTiposUsoDto) {
    return this.tiposUsoService.update(
      updateTiposUsoDto.id, updateTiposUsoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tiposUsoService.remove(id);
  }

  @Patch('available/:id')
  enable(@Param('id', ParseIntPipe) id: number) {
    return this.tiposUsoService.makeAvailable(+id);
  }
}