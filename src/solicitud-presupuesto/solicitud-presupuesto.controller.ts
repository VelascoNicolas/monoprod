import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { SolicitudPresupuestoService } from './solicitud-presupuesto.service';
import { CreateSolicitudPresupuestoDto } from './dto/create-solicitud-presupuesto.dto';
import { UpdateSolicitudPresupuestoDto } from './dto/update-solicitud-presupuesto.dto';
import { paginationDto } from '../common/dto';
import { estadoSolicitudDto } from './dto/change-estado-solicitud-dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('solicitud-presupuesto')
@ApiTags('SolicitudPresupuesto')
export class SolicitudPresupuestoController {
  constructor(private readonly solicitudPresupuestoService: SolicitudPresupuestoService) {}

  @Post()
  create(@Body() createSolicitudPresupuestoDto: CreateSolicitudPresupuestoDto) {
    return this.solicitudPresupuestoService.create(createSolicitudPresupuestoDto);
  }

  @Get()
  findAll(@Query() paginationDto: paginationDto) {
    return this.solicitudPresupuestoService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudPresupuestoService.findOne(id);
  }

  @Patch(':id')
  update(@Body() updateSolicitudPresupuestoDto: UpdateSolicitudPresupuestoDto) {
    return this.solicitudPresupuestoService.update(updateSolicitudPresupuestoDto.id, updateSolicitudPresupuestoDto);
  }

 @Patch('/estadoSolicitud')
  updateState(@Body() estadoSolicitudDto: estadoSolicitudDto) {
    console.log("id: ", estadoSolicitudDto.id, "estado: ", estadoSolicitudDto)
    return this.solicitudPresupuestoService.cambiarEstadoSolicitud(estadoSolicitudDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudPresupuestoService.remove(id);
  }

  @Patch('enable/:id')
  enable(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudPresupuestoService.enable(id);
  }

  @Get('estadosBySolicitud/:id')
  findAllEstados(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudPresupuestoService.getAllEstados(id);
  }

  @Get('solicitudesByProduct/:id')
  findByProduct(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudPresupuestoService.getSolicitudesByProduct(id);
  }

}
