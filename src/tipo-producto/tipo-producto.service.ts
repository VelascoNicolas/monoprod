import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { UpdateTipoProductoDto } from './dto/update-tipo-producto.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TipoProductoService extends PrismaClient implements OnModuleInit{
  
  private readonly logger = new Logger('TipoProductoService')

  onModuleInit() {
    this.$connect();
    this.logger.log('Databse connected')
  }


  create(createTipoProductoDto: CreateTipoProductoDto) {
    console.log('servicio create tipo producto: ', createTipoProductoDto)
    return this.tipoProducto.create({
      data: createTipoProductoDto
    })
  }

  async findAll() {
    const tipoProductos = await this.tipoProducto.findMany({
      where: {available: true},
      select: {
        id: true,
        nombreTipo: true,
        tiposRelacionados: {
          where: { available: true }, // Solo los tipos relacionados que estén habilitados
          select: {
            id: true,
            nombreTipo: true,
          },
        },
      },
    });
    console.log('tipo productos encontrados: ', tipoProductos)
    return tipoProductos
  }

  async findOne(id: number) {
    console.log('servicio find one tipo producto with id: ', id)
    const tipoProducto = await this.tipoProducto.findFirst({
      where:{
        id:id , available: true
    },
    select: {
      id: true,
      nombreTipo: true,
      tiposRelacionados: {
        where: { available: true }, // Solo los tipos relacionados que estén habilitados
        select: {
          id: true,
          nombreTipo: true,
        },
      },
    },
  })
    console.log('servicion find one tipo producto: ', tipoProducto) 

    if(!tipoProducto){
      throw new RpcException({
        message: `Tipo producto with id ${id} was not found`,
        status: HttpStatus.BAD_REQUEST
      })
    }
    return tipoProducto
  }

  async exists(id: number) {
    console.log('servicio exists tipo producto with id: ', id)
    const tipoProducto = await this.tipoProducto.findFirst({
      where:{
        id:id
      }
    })
    console.log('servicion exists tipo producto: ', tipoProducto) 

    if(!tipoProducto){
      throw new RpcException({
        message: `Tipo producto with id ${id} was not found`,
        status: HttpStatus.BAD_REQUEST
      })
    }
    return true
  }

  async update(id: number, updateTipoProductoDto: UpdateTipoProductoDto) {
    await this.findOne(id)
    
    return this.tipoProducto.update({
      where:{id: id}, 
      data: updateTipoProductoDto
    })
  }

  async remove(id: number) {
    await this.findOne(id)
    
    return this.tipoProducto.update({
      where:{id}, 
      data:{available: false}
    })
  }

  async updateToAvailable(id: number) {
    await this.exists(id)
    
    return this.tipoProducto.update({
      where:{id}, 
      data: {available: true}
    })
  }


}
