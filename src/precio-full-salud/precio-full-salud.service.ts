import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreatePrecioFullSaludDto } from './dto/create-precio-full-salud.dto';
import { UpdatePrecioFullSaludDto } from './dto/update-precio-full-salud.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PrecioFullSaludService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('PrecioFullSaludService')

  onModuleInit() {
    this.$connect();
    this.logger.log('Databse connected')
  }

  async create(createPrecioFullSaludDto: CreatePrecioFullSaludDto) {
    console.log('create precio descuento: ', createPrecioFullSaludDto)
  
    //buscar decuento habilitado
    const existingAvailablePrice = await this.descuentoProducto.findFirst({
      where: {
        productoId: createPrecioFullSaludDto.productoId,
        available: true,
      },
    });

    // Si existe, cambia `available` a false en el precio actual
    if (existingAvailablePrice) {
      await this.descuentoProducto.update({
        where: { id: existingAvailablePrice.id },
        data: { available: false },
      });
    }

     // Crear el nuevo precio con `available: true` y asociarlo al producto
     return this.descuentoProducto.create({
      data: {
        precioDescuento: createPrecioFullSaludDto.precioDescuento,
        available: true,
        producto: { connect: { id: createPrecioFullSaludDto.productoId } },
      },
    });
  }

  findAll() {
    return this.descuentoProducto.findMany({
      include: { producto: true },
    });
  }

  findOne(id: number) {
    const precio = this.descuentoProducto.findUnique(
      { where: { id } }
    );
    if (!precio) {
      throw new RpcException({
        message: `descuento with id ${id} was not found`,
        status: HttpStatus.BAD_REQUEST
      })
    }

    return precio;
  }

  async exists(id: number) {
    console.log('servicio exists tipo producto with id: ', id)
    const descuentoProducto = await this.descuentoProducto.findFirst({
      where: { id }
    })
    console.log('servicion exists tipo producto: ', descuentoProducto)

    if (!descuentoProducto) {
      throw new RpcException({
        message: `Tipo producto with id ${id} was not found`,
        status: HttpStatus.BAD_REQUEST
      })
    }
    return true
  }

  async update(id: number, updatePrecioFullSaludDto: UpdatePrecioFullSaludDto) {
    await this.exists(id)
    console.log('update precio Full salud id : ',id, updatePrecioFullSaludDto )
    const updated = await this.descuentoProducto.update({
      where: { id },
      data: {
        precioDescuento: updatePrecioFullSaludDto.precioDescuento
      }
    })
    return updated
  }

  async remove(id: number) {
    await this.exists(+id)

    return this.descuentoProducto.update({
      where: { id },
      data: { available: false }
    })
  }

  async makeAvailable(id: number) {
    await this.exists(id)

    return this.descuentoProducto.update({
      where: { id },
      data: { available: true }
    })
  }
}
