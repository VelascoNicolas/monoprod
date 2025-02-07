import { Body, Controller, Delete, Get, Logger, Patch, Post, Query } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { paginationDto } from '../common/dto';
import { FindAllbyUserDto } from './dto/FindAllUser-receta.dto';
import { FindOneRecetaDto } from './dto/findOnereceta.dto';
import { DeleteRecetaDto } from './dto/deleteReceta.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('recetas')
@ApiTags('Recetas')
export class RecetaController {
  logger = new Logger('RecetaController');
  constructor(private readonly recetaService: RecetaService) {}

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto) {
    this.logger.log(
      'create receta controller ',
      JSON.stringify(createRecetaDto),
    );
    return this.recetaService.create(createRecetaDto);
  }

  @Get()
  findAll(@Query() paginationDto: paginationDto) {
    this.logger.log('findAllReceta controller ');
    return this.recetaService.findAll(paginationDto);
  }

  @Get('/ByUser')
  findAllByUser(@Body() findAllByUserDto: FindAllbyUserDto) {
    this.logger.log('findAllRecetaByUser controller ');
    return this.recetaService.findAllByUser(findAllByUserDto);
  }

  @Get(':id')
  findOne(@Body() id: FindOneRecetaDto) {
    this.logger.log('findOneReceta controller ' + JSON.stringify(id));
    return this.recetaService.findOne(id.idReceta);
  }

  @Delete(':id')
  remove(@Body() id: DeleteRecetaDto) {
    this.logger.log('removeReceta controller ' + JSON.stringify(id));
    return this.recetaService.remove(id.idReceta);
  }

  @Patch(':id')
  update(@Body() updateRecetaDto: UpdateRecetaDto) {
    return this.recetaService.update(updateRecetaDto.id, updateRecetaDto);
  }
}
