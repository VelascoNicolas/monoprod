import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { UpdateImagenDto } from './dto/update-imagen.dto';
import { PrismaClient } from '@prisma/client';
import { FavoritosService } from '../favoritos/favoritos.service';
import { ProductsService } from '../products/products.service';
import { RemoveImagenDto } from './dto/remove-imagen.dto';
import { FindImagenDto } from './dto/find-imagen.dto';

@Injectable()
export class ImagenService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('favoritoService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }
  constructor(
    private readonly favoritoService: FavoritosService,
    private readonly productsService: ProductsService,
  ) {
    super();
  }

  async create(createImagenDto: CreateImagenDto) {
    try {
      //no me acuerdo porque puse el user id
      //await this.favoritoService.validateUser(createImagenDto.userId);
      await this.productsService.exists(createImagenDto.productoId);
      const imagen = await this.imagen.create({
        data: {
          tipoImagen: createImagenDto.tipoImagen,
          descripcion: createImagenDto.descripcion,
          urlImagen: createImagenDto.urlImagen,
          productoId: createImagenDto.productoId,
        },
      });
      return imagen;
    } catch (error) {
      this.logger.error('Error en create imagen:', error);
      throw error;
    }
  }

  async findAllImgByProduct(findImagenDto: FindImagenDto) {
    try {
      await this.productsService.exists(findImagenDto.productoId);
      const imagenes = await this.imagen.findMany({
        where: { productoId: findImagenDto.productoId, available: true },
      });
      this.logger.log('imagenes encontradas', JSON.stringify(imagenes));
      return imagenes;
    } catch (error) {
      this.logger.error('Error en findAllByImagen', error);
      throw error;
    }
  }

  async findOne(findImagenDto: FindImagenDto) {
    try {
      await this.productsService.exists(findImagenDto.productoId);
      const imagen = await this.imagen.findUnique({
        where: { id: findImagenDto.idImg, available: true },
      });
      return imagen;
    } catch (error) {
      this.logger.error('Error en findOne imagen:', error);
      throw error;
    }
  }

  update(id: number, updateImagenDto: UpdateImagenDto) {
    return `This action updates a #${id} imagen`;
  }

  async remove(removeImagenDto: RemoveImagenDto) {
    try {
      console.log('removeImagenDto: ', removeImagenDto);
      const imagen = await this.findOne({ idImg: removeImagenDto.idImagen });
      if (!imagen) {
        throw new BadRequestException('La imagen no existe');
      }

      await this.productsService.exists(removeImagenDto.productId);

      const imagenEliminada = await this.imagen.update({
        where: { id: removeImagenDto.idImagen },
        data: { available: false },
      });

      this.logger.log('Imagen eliminada exitosamente');
      return imagenEliminada;
    } catch (error) {
      this.logger.error('Error en remove imagen:', error);
      throw error;
    }
  }
}
