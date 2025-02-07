import { Body, Controller, Delete, Get, Logger, Post } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { FindFavoritoDto } from './dto/find-favorito.dto';
import { DeleteFavoritoDto } from './dto/delete-favorito.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('favoritos')
@ApiTags('Favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}
  private readonly logger = new Logger('favoritoController');

  @Post()
  async createFavorite(@Body() createFavoriteDto: CreateFavoritoDto) {
    this.logger.log('Datos recibidos controller create:', createFavoriteDto);
    return this.favoritosService.create(createFavoriteDto);
  }

  @Get(':/byUser')
  async getFavoritesByUser(@Body() data: FindFavoritoDto) {
    this.logger.log('Datos recibidos controller get:', data);
    return this.favoritosService.findAllByUserId(data);
  }

  @Delete('User&Product')
  async deleteFavorite(@Body() deleteFavoritoDto: DeleteFavoritoDto) {
    this.logger.log('Datos recibidos controller delete:', deleteFavoritoDto);
    return this.favoritosService.remove(deleteFavoritoDto);
  }
}
