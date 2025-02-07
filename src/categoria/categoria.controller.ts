import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categorias')
@ApiTags('Categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  //@MessagePattern({cmd:'createCategoria'})
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    console.log('controller create categoria recibida: ', createCategoriaDto)
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  // @MessagePattern({cmd: 'findAllCategoria'})
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  // @MessagePattern({cmd: 'findOneCategoria'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log('microservicio producto categoria get one category id: ', id )
    return this.categoriaService.findOne(+id);
  }

  @Patch(':id')
  // @MessagePattern({cmd: 'updateCategoria'})
  update(@Body() updateCategoriaDto: UpdateCategoriaDto) {
    console.log('microservicio producto update categoria to update: ', updateCategoriaDto)
    return this.categoriaService.update(updateCategoriaDto.id, updateCategoriaDto);
  }

  @Delete(':id')
  // @MessagePattern({cmd: 'removeCategoria'})
  remove(@Param() id: number) {
    return this.categoriaService.remove(id);
  }

  @Patch('/available/:id')
  // @MessagePattern({cmd: 'enable_categoria'})
  updateAvailable(@Param('id', ParseIntPipe) id: number){
    return this.categoriaService.updateAvailable(id);
  }
}
