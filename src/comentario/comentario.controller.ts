import { Controller, Logger, Delete, Get, Post, Body } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { FindUserDto } from './dto/find-user.dto';
import { DeleteComentDto } from './dto/deleteComentario.dto';
import { FindProductDto } from './dto/find-product.dto';
import { FindByRating } from './dto/find-rating.dto.';
import { ApiTags } from '@nestjs/swagger';

@Controller('comentarios')
@ApiTags('Comentarios')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}
  private readonly logger = new Logger('ComentarioController');

  @Post()
  async create(@Body() createComentarioDto: CreateComentarioDto) {
    this.logger.log(
      'Datos recibidos controller create:',
      JSON.stringify(createComentarioDto),
    );
    return this.comentarioService.create(createComentarioDto);
  }

  //encontrar todos los comentraios de un user
  @Get('/byUser')
  async getComentByUser(@Body() data: FindUserDto) {
    this.logger.log('Datos recibidos controller get:', JSON.stringify(data));
    return this.comentarioService.findAllByUser(data);
  }

  //encontrar todos los comentarios de un producto
  @Get('/byProduct')
  async getComentByproduct(@Body() data: FindProductDto) {
    this.logger.log('Datos recibidos controller get:', JSON.stringify(data));
    return this.comentarioService.findAllComentProduct(data);
  }
  //eliminar comentario
  @Delete(':id')
  async remove(@Body() deleteComentDto: DeleteComentDto) {
    this.logger.log(
      'Datos recibidos para eliminar comentario:',
      JSON.stringify(deleteComentDto),
    );
    return this.comentarioService.remove(deleteComentDto);
  }

  //Encontrar un Producto por su rating
  @Get('/byRating')
  async findAllByRatingComentario(@Body() data: FindByRating) {
    this.logger.log('Datos recibidos controller get:', JSON.stringify(data));
    return this.comentarioService.FindByRatingComentario(data);
  }
}
