import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
import { UpdatePresupuestoDto } from './dto/update-presupuesto.dto';
import { PrismaClient } from '@prisma/client';
import { paginationDto } from '../common/dto';
import { RpcException } from '@nestjs/microservices';
import { estadoPresupuestoDto } from './dto/estado-resupuesto.dto';
import { ProveedoresService } from '.././proveedores/proveedores.service';
import { ProductsService } from '.././products/products.service';
import { SolicitudPresupuestoService } from '.././solicitud-presupuesto/solicitud-presupuesto.service';

@Injectable()
export class PresupuestoService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('SolicitudPresupuestoService')
    
    onModuleInit() {
      this.$connect();
      this.logger.log('Database connected')
    }

    constructor( 
      private readonly proveedoresService: ProveedoresService,
      private readonly productoService: ProductsService,
      private readonly solicitudService: SolicitudPresupuestoService
    ){
      super()
    }

    async create(createPresupuestoDto: CreatePresupuestoDto) {
    try {
      const {descripcion, monto, cantidad,
         proveedorId, productoId, solicitudId} = createPresupuestoDto

      if (!proveedorId) {
        throw new Error('El proveedorId es obligatorio para crear un presupuesto.');
      }

      const createPresupuesto = await this.presupuesto.create({
        data:{
          descripcion, monto, cantidad, 
          producto:{
            connect:{id: productoId}
          },
          proveedor:{
            connect:{id: proveedorId}
          },
          solicitudPresupuesto:{
            connect:{id: solicitudId}
          }
        }
      })
      const estadoPresupuesto = await this.historialEstadoPresupuesto.create({
        data:{
          estado: 'CREADO',
          available: true,
          presupuesto:{
            connect:{id: createPresupuesto.id}
          }
        }
      })
      return createPresupuesto;
    } catch (error) {
        this.logger.error('Error en create:', error);
        throw error
    }
  }

  async findAll(paginationDto: paginationDto) {
    const { page, limit } = paginationDto;
  
    const totalPages = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil(totalPages / limit);
    let presupuesto 
    try {
       presupuesto = await this.presupuesto.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
        select:{
          id: true,
          estado:true,
          descripcion: true,
          cantidad: true, 
          monto: true,
          proveedorId: true,
          productoId: true,
          descargaPresupuestoId: true,
          solicitudPresupuestoId: true
        }
      })
    } catch (error) {
      this.logger.error('Error en find all:', error);
      throw error
    }
    return {
      data: presupuesto,
      meta:{
        total: totalPages,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: number) {
    const presupuesto = await this.presupuesto.findUnique({
      where: { id: id },
        select:{
          id: true,
          estado:true,
          descripcion: true,
          cantidad: true, 
          monto: true,
          proveedorId: true,
          productoId: true,
          descargaPresupuestoId: true,
          solicitudPresupuestoId: true
        }
    })
    if(!presupuesto){
      throw new RpcException({
        message: `Presupuesto with id ${id} was not found!!`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return presupuesto
  }

  async exists(id: number){
      const presupuesto = this.presupuesto.findFirst({
        where:{id}
      })
      if (!presupuesto) {
            throw new NotFoundException('Presupuesto you want was not found');
      }
      return presupuesto
    }

  async update(id: number, updatePresupuestoDto: UpdatePresupuestoDto) {
    try {
      const {descripcion, cantidad, monto, 
        proveedorId, productoId,
         descargaPresupuestoId, solicitudId} = updatePresupuestoDto

      const presupuestoToUpdate = await this.findOne(id)
      if(!presupuestoToUpdate){
        throw new Error(`Presupuesto con id ${id} no encontrada`)
      }

      const updated = await this.presupuesto.update({
        where: { id: id },
        data:{descripcion, monto, cantidad,
          ...(productoId && {
              producto:{
                connect:{id: productoId}
            }
          }),
          ...(descargaPresupuestoId && 
                { descargaPresupuesto: {
                  connect:{id: descargaPresupuestoId}
          }}),
          ...( solicitudId &&
            {
              solicitudPresupuesto:{
                connect:{id: solicitudId}
              }
            }
          )
        }
      })
      return updated
    } catch (error) {
      this.logger.error('Error en create:', error);
      throw error
    }
  }

  async remove(id: number) {
    try {
      
      const presupuesto = await this.presupuesto.findUnique({
        where: { id },
        include: { historialPresupuesto: true }, // Asegurarse de incluir la relación con el historial
      });

      if (!presupuesto) {
        throw new Error(`Presupuesto con id ${id} no encontrada`);
      }
      if (!presupuesto.available) {
        throw new Error(`Presupuesto con id ${id} ya esta removido`);
      }

      const removed = await this.presupuesto.update({
        where:{id},
        data:{
          available: false,
        }
      })
      return {msg:'Presupuesto removido con exito'}
    } catch (error) {
    this.logger.error('Error en create:', error);
    throw error
   }
    
  }

  async enable(id: number) {
    try {
      
      const presupuesto = await this.presupuesto.findUnique({
        where: { id },
        include: { historialPresupuesto: true }, // Asegurarse de incluir la relación con el historial
      });

      if (!presupuesto) {
        throw new Error(`Presupuesto con id ${id} no encontrada`);
      }
      if (presupuesto.available) {
        throw new Error(`Presupuesto con id ${id} ya esta habilitado`);
      }

      const removed = await this.presupuesto.update({
        where:{id},
        data:{
          available: true,
        }
      })
      return {msg:'Presupuesto habilitado con exito'}
    } catch (error) {
    this.logger.error('Error en create:', error);
    throw error
   } 
  }

async cambiarEstadoPresupuesto(estadoDto: estadoPresupuestoDto){
 
  try {
    const {id, estado} = estadoDto

    const presupuesto = await this.presupuesto.findUnique({
      where: { id },
      include:{ historialPresupuesto: true}
    })
    if (!presupuesto) {
      throw new Error(`Presupuesto con id ${id} no encontrado`);
    }
    if(presupuesto.estado === estado){
      return {
        msg: "El estado del presupuesto ya es el mismo que el nuevo estado"
      }
    }

    const historialActual = presupuesto.historialPresupuesto.length >0
    ? presupuesto.historialPresupuesto.reduce((ultimo, actual) =>
        new Date(ultimo.fechaModificacion) > new Date(actual.fechaModificacion)
          ? ultimo
          : actual
      ) : null;

      if (!historialActual) {
        console.log('No hay historial actual');
      }

      if(historialActual){
        console.log("solicitud hitorial acualizado:", historialActual)
        const historialActualizado = await this.historialEstadoPresupuesto.update({
          where:{id: historialActual.id},
          data:{
            available: false,
            fechaModificacion: new Date(),
          }
        })
        console.log("historial actualizado: ", historialActualizado)
      }

      const nuevoHistorial = await this.historialEstadoPresupuesto.create({
        data:{
          estado: estado,
          fechaModificacion: new Date(),
          available: true,
          presupuesto:{
            connect:{id}
          },
        }
      })

      if(nuevoHistorial) {
        const presupuestoActualizadoEstado = await this.presupuesto.update({
          where: { id },
          data:{estado: estado}
        })
        console.log('estado presupuesto actualizado', presupuestoActualizadoEstado)
      }

      console.log("nuevo historial creado:", nuevoHistorial)

    return { message: 'Estado de la presupuesto y el historial actualizados correctamente' };
    
  } catch (error) {
    this.logger.error('Error en cambiar estado presupuest:', error.message);
    throw new Error('Error al cambiar el estado de presupuesto.');
  }
}

async getAllEstados(id: number){
  const historial = await this.historialEstadoPresupuesto.findMany({
    where:{presupuestoId: id},
    orderBy: {fechaModificacion: 'desc'}
  })
  return historial
}

//buscar los presupuestos de un proveedor, id es isProveedor
async findMyPresupuesto(id: number) {
  //existe proveedor
  const proveedor = await this.proveedoresService.findOne(id)
  if(!proveedor){
    throw new Error('Presupuesto de proveedor no encontrado, verifique el proveedor e intente nuevamente')
  }
  const presupuesto = await this.presupuesto.findUnique({
    where: { proveedorId: id },
      select:{
        id: true,
        estado:true,
        descripcion: true,
        cantidad: true, 
        monto: true,
        proveedorId: true,
        productoId: true,
        descargaPresupuestoId: true,
        solicitudPresupuestoId: true
      }
  })
  if(!presupuesto){
    throw new RpcException({
      message: `Presupuesto with proveedorID ${id} was not found!!`,
      status: HttpStatus.BAD_REQUEST,
    });
  }
  return presupuesto
}

//buscar los presupuestos de un solicitud, id es solicitudId
async findPresupuestosBySolicitud(id: number) {
  //existe solicitud
  const solicitud = await this.solicitudService.findOne(id)
  if(!solicitud){
    throw new Error('Presupuesto de solicitud no encontrado, verifique la solicitud e intente nuevamente')
  }
  const presupuesto = await this.presupuesto.findUnique({
    where: { solicitudPresupuestoId: id },
      select:{
        id: true,
        estado:true,
        descripcion: true,
        cantidad: true, 
        monto: true,
        proveedorId: true,
        productoId: true,
        descargaPresupuestoId: true,
        solicitudPresupuestoId: true
      }
  })
  if(!presupuesto){
    throw new RpcException({
      message: `Presupuesto with solicitudPresupuestoId ${id} was not found!!`,
      status: HttpStatus.BAD_REQUEST,
    });
  }
  return presupuesto
}

async findPresupuestosByProducto(id: number) {

  //existe producto
  const producto = await this.productoService.findOne(id)
  if(!producto){
    throw new Error('Presupuesto de producto no encontrado, verifique el producto e intente nuevamente')
  }

  const presupuesto = await this.presupuesto.findUnique({
    where: { productoId: id },
      select:{
        id: true,
        estado:true,
        descripcion: true,
        cantidad: true, 
        monto: true,
        proveedorId: true,
        productoId: true,
        descargaPresupuestoId: true,
        solicitudPresupuestoId: true
      }
  })
  if(!presupuesto){
    throw new RpcException({
      message: `Presupuesto with solicitudPresupuestoId ${id} was not found!!`,
      status: HttpStatus.BAD_REQUEST,
    });
  }
  return presupuesto
}

}
