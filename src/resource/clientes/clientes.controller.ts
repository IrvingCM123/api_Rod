import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/common/enums/roles.enum';
import { ActiveUser } from 'src/common/decorators/user.decorator';
import { User_Interface } from 'src/common/interfaces/user.interface';

@Auth(Roles.ADMIN)
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto, @ActiveUser() user: User_Interface) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll(@ActiveUser() user: User_Interface) {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.clientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto, @ActiveUser() user: User_Interface) {
    return this.clientesService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: User_Interface) {
    return this.clientesService.remove(+id);
  }
}
