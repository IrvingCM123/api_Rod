import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Roles.ADMIN)
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto, @ActiveUser() user: User_Interface) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  findAll(@ActiveUser() user: User_Interface) {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto, @ActiveUser() user: User_Interface) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Put('actualizarInventario/:id')
  actualizarInventario(@Param('id') id: string, @Body() cantidadRestar: number, @ActiveUser() user: User_Interface) {
    return this.productosService.actualizarInventario(+id, cantidadRestar);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.productosService.remove(+id);
  }
}
