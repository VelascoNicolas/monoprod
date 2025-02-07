import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { PresupuestoService } from './presupuesto.service';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
import { UpdatePresupuestoDto } from './dto/update-presupuesto.dto';
import { paginationDto } from '../common/dto';
import { estadoPresupuestoDto } from './dto/estado-resupuesto.dto';
import { estadoPresupuestoList } from './enum/estado-presupuesto';
import { EstadoPresupuesto } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('presupuesto')
@ApiTags('Presupuesto')
export class PresupuestoController {
  constructor(private readonly presupuestoService: PresupuestoService) {}

  @Post()
  create(@Body() createPresupuestoDto: CreatePresupuestoDto) {
    return this.presupuestoService.create(createPresupuestoDto);
  }

  @Get()
  findAll(@Query() paginationDto: paginationDto) {
    return this.presupuestoService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.findOne(id);
  }

  @Patch()
  update(@Body() updatePresupuestoDto: UpdatePresupuestoDto) {
    return this.presupuestoService.update(updatePresupuestoDto.id, updatePresupuestoDto);
  }

  //cambiar messagepattern a igual a gateway
  @Put('/estadoPresupuesto')
  async updateEstadoPresupuesto(@Body() estadoPresupuestoDto: estadoPresupuestoDto){
    //chequear hacer controller igual al gateway
    console.log('estado tipo: ')
    console.log(typeof estadoPresupuestoDto.estado)
    const estado = estadoPresupuestoDto.estado as EstadoPresupuesto;
    const id = estadoPresupuestoDto.id

    if (!estadoPresupuestoList.includes(estado)) {
      throw new BadRequestException({
        message: 'Estado inválido',
        estadosValidos: estadoPresupuestoList,
      });
    }
    // console.log('ms producto update presupuesto estado' , estadoPresupuestoDto)
    return await this.presupuestoService.cambiarEstadoPresupuesto({id, estado})
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.remove(id);
  }

  @Patch(':id')
  enable(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.enable(id);
  }

  @Get('estadosPresupuestos/:id')
  findAllEstados(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.getAllEstados(id);
  }

  @Get('ByProveedor/:id')
  findByProveedor(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.findMyPresupuesto(id);
  }

  @Get('BySolicitud/:id')
  findBySolicitud(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.findPresupuestosBySolicitud(id);
  }

  @Get('ByProducto/:id')
  findByProdducto(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestoService.findPresupuestosByProducto(id);
  }

}