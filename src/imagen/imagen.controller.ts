import { Body, Controller, Delete, Get, Logger, Patch, Post } from '@nestjs/common';
import { ImagenService } from './imagen.service';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { FindImagenDto } from './dto/find-imagen.dto';
import { RemoveImagenDto } from './dto/remove-imagen.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('imagen')
@ApiTags('Imagen')
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}
  private readonly logger = new Logger('imagenController');

  @Post()
  create(@Body() createImagenDto: CreateImagenDto) {
    this.logger.log('create imagen controller ', createImagenDto);
    return this.imagenService.create(createImagenDto);
  }

  @Get('ByProduct')
  findAllImagenByProduct(@Body() findImagenDto: FindImagenDto) {
    this.logger.log('findAll imagen controller ', findImagenDto);
    return this.imagenService.findAllImgByProduct(findImagenDto);
  }

  @Delete('ByProduct')
  async removeImage(@Body() payload: RemoveImagenDto) {
    this.logger.log('Datos recibidos controller removeImage:', payload);
    return this.imagenService.remove(payload);
  }

  @Get(':id')
  findOne(@Body() findImagenDto: FindImagenDto) {
    return this.imagenService.findOne(findImagenDto);
  }

  @Patch()
  update(@Body() updateImagenDto: UpdateImagenDto) {
    return this.imagenService.update(updateImagenDto.id, updateImagenDto);
  }
}
