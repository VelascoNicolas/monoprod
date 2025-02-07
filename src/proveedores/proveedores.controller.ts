import { Body, Controller, Delete, Get, Logger, Patch, Post } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { paginationDto } from '../common/dto';
import { UpdateProvpayload } from './dto/update-validation.dto';
import { RemoveProvedorDto } from './dto/remove-proveedor.dto';
import { FindOneProvedoresDto } from './dto/findOne-proveedores.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('proveedores')
@ApiTags('Proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}
  private readonly logger = new Logger('ProveedoresController');

  @Post()
  async create(@Body() createProveedoreDto: CreateProveedoreDto) {
    this.logger.log('create proveedore controller ', createProveedoreDto);
    return await this.proveedoresService.create(createProveedoreDto);
  }

  @Get()
  async findAll(paginationDto: paginationDto) {
    this.logger.log('findAllProvedores controller ');

    return await this.proveedoresService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Body() findOneProvedoresDto: FindOneProvedoresDto) {
    this.logger.log(
      'findOne proveedore controller ',
      JSON.stringify(findOneProvedoresDto),
    );
    return this.proveedoresService.findOne(findOneProvedoresDto.idProveedor);
  }

  @Patch()
  update(@Body() updateProvpayload: UpdateProvpayload) {
    this.logger.log(
      'update proveedore controller ',
      JSON.stringify(updateProvpayload),
    );
    return this.proveedoresService.update(
      updateProvpayload.id,
      updateProvpayload,
    );
  }

  @Delete(':id')
  remove(@Body() removeProvedorDto: RemoveProvedorDto) {
    this.logger.log('remove proveedore controller ');
    return this.proveedoresService.remove(removeProvedorDto.idProveedor);
  }
}