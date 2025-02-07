import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { PrismaClient } from '@prisma/client';
import { paginationDto } from '../common/dto';
import { UpdateProvpayload } from './dto/update-validation.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProveedoresService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProveedoresService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Databse connected');
  }

  async create(createProveedoreDto: CreateProveedoreDto) {
    try {
      this.logger.log('create proveedore service ', createProveedoreDto);

      const { email, telefono } = createProveedoreDto;

      const Proveedorexistente = await this.proveedores.findFirst({
        where: { OR: [{ email }, { telefono }] },
      });

      if (Proveedorexistente) {
        this.logger.error('Proveedor ya existe con este email o teléfono.');
        throw new Error(
          'El proveedor ya existe con el email o teléfono proporcionado.',
        );
      }

      const proveedore = this.proveedores.create({
        data: createProveedoreDto,
      });

      this.logger.log(
        'Proveedor creado exitosamente:',
        JSON.stringify(proveedore),
      );
      return proveedore;
    } catch (error) {
      this.logger.error('Error creating proveedore', error);
      throw error;
    }
  }

  async findAll(paginationDto: paginationDto) {
    try {
      const totalProveedores = await this.proveedores.count({
        where: { available: true },
      });

      const totalPages = Math.ceil(totalProveedores / paginationDto.limit);
      const proveedores = await this.proveedores.findMany({
        where: { available: true },
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
        select: {
          id: true,
          nombre: true,
          email: true,
          telefono: true,
        },
      });
      this.logger.log('proveedores encontrados', JSON.stringify(proveedores));
      return {
        data: proveedores,
        meta: {
          total: totalProveedores,
          pages: totalPages,
        },
      };
    } catch (error) {
      this.logger.error('Error buscar todos provedores', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      this.logger.log('findOne proveedore service ', JSON.stringify(id));

      const proveedor = await this.proveedores.findUnique({
        where: { id: id, available: true },
        select: {
          nombre: true,
          email: true,
          telefono: true,
        },
      });

      if (!proveedor) {
        throw new Error(`Proveedor con id ${id} no encontrado`);
      }
      this.logger.log('proveedor encontrado', JSON.stringify(proveedor));
      return proveedor;
    } catch (error) {
      this.logger.error('Error buscar un proveedor', error);
      throw new RpcException(error.message);
    }
  }

  async update(id: number, updateProveedoreDto: UpdateProvpayload) {
    this.logger.log('update proveedore service ', updateProveedoreDto);

    try {
      await this.findOne(id);

      const proveedor = await this.proveedores.update({
        where: { id: id, available: true },
        data: updateProveedoreDto,
      });

      this.logger.log('proveedor actualizado', JSON.stringify(proveedor));
      return proveedor;
    } catch (error) {
      this.logger.error('Error al actualizar proveedor', error);
      throw new RpcException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      const proveedor = await this.proveedores.update({
        where: { id: id, available: true },
        data: { available: false },
      });

      this.logger.log('proveedor eliminado', JSON.stringify(proveedor));
      return proveedor;
    } catch (error) {
      this.logger.error('Error al eliminar proveedor', error);
      throw new RpcException(error.message);
    }
  }
}
