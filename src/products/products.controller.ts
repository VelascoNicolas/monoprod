import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { paginationDto } from '../common/dto';
import { SearchProductDto } from './dto/search-product.dto';
import { ApiTags,ApiQuery } from '@nestjs/swagger';

@Controller('productos')
@ApiTags('Productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //TODO verificar funcionamiento parseIntPipe automatico
  //Deprecated
  //buscar query
  @Get('/productsSearch')
  @ApiQuery({ name: 'marca/nombre/precioMin/precioMax', type: String })
  async getProductSearch(@Query() query: SearchProductDto){
    console.log('query: ', query)
    const response = await this.productsService.searchProducts(query)
    return response
    //return true
  }

  

  @Get()
  findAll(@Query() paginationDto: paginationDto) {
    //return paginationDto
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { //{id: 1}
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);    
  }

  @Patch(':id')
  update(
    //@Param('id', ParseIntPipe) id: number, 
    //@Body() updateProductDto: UpdateProductDto) {
      @Body() updateProductDto: UpdateProductDto){
    //update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  //eliminacion suave o logica
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  //habilitar un producto
  @Patch('/available/:id')
  updateAvailable(@Param('id', ParseIntPipe) id: number) {
  //update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateAvailable(id);
  }

  @Get('productByCategory/:id')
  async getProductByCategory(@Param('id', ParseIntPipe) id: number, @Query() paginationDto: paginationDto){
    const response = await this.productsService.getProductByCategory(id, paginationDto )
    return response;
  }

  @Get('productByName/:name')
  async getProductByName(@Param('name') nombre: string, @Query() paginationDto: paginationDto){
    const response = await this.productsService.buscarProductosPorNombre(nombre, paginationDto)
    return response
  }

  @Post('/validate')
  validateProduct(@Body('ids') ids: number[]) {
    console.log("Received ids:", ids); // Check if ids are received correctly
    return this.productsService.validateProducts(ids);
  }

  @Get('productByTipo/:id')
  async getProductByTipo(@Param('id', ParseIntPipe) id: number, @Query() paginationDto: paginationDto){
    const response = await this.productsService.getProductsByTipoProducto(id, paginationDto)
    return response;
  }
}
