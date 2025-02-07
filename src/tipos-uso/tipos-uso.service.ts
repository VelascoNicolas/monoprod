import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { UpdateTiposUsoDto } from './dto/update-tipos-uso.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { ProductsService } from '../products/products.service';

@Injectable()
export class TiposUsoService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('DescripcionService')

  constructor(private readonly productsService: ProductsService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected')
  }

  // create(createTiposUsoDto: CreateTiposUsoDto) {
  //   return 'This action adds a new tiposUso';
  // }

  // findAll() {
  //   return `This action returns all tiposUso`;
  // }

  async findOne(id: number) {
    const tipoUso = await this.tipoUso.findFirst({
      where: {id}
    })
    if(!tipoUso){
      throw new RpcException({
        message: `Tipo de Uso with id ${id} was not found!!`,
        status: HttpStatus.BAD_REQUEST
      })
    }
    return tipoUso
  }

  async update(id: number, updateTiposUsoDto: UpdateTiposUsoDto) {
    const {idProducto, descripcion, tiposDeUso} = updateTiposUsoDto
    const producto = await this.productsService.findOne(idProducto)

    if (!producto){
      throw new RpcException({
        message: `Producto with id ${id} was not found!!`,
        status: HttpStatus.BAD_REQUEST
      })
    }

    const tipoDeUsoToUpdate = this.findOne(id)
    if(!tipoDeUsoToUpdate){
      throw new NotFoundException('La descripcion no fue encontrada');
    }

    return this.tipoUso.update({
      where: {id},
      data:{
        descripcion, tiposDeUso
      }
    })
  }

  async remove(id: number) {
    const tipoDeUsoToRemove = await this.findOne(id)
    if(!tipoDeUsoToRemove){
      throw new NotFoundException('La descripcion no fue encontrada');
    }

    if(tipoDeUsoToRemove.available === false)
      {
        //check message?
        return {
          message: `Tipo de uso ${id} is already disable!!`
        }
      }

    return this.tipoUso.update({
      where: {id},
      data:{
        available: false
      }
    })
  }

  async makeAvailable(id: number) {
    const tipoDeUsoToEnable = await this.findOne(id)
    if(!tipoDeUsoToEnable){
      throw new NotFoundException('La descripcion no fue encontrada');
    }
    if(tipoDeUsoToEnable.available === true)
    {
      return {
        message: `Tipo de uso ${id} is already available!!`
      }
    }

    return this.tipoUso.update({
      where: {id},
      data:{
        available: true
      }
    })
  }

}
