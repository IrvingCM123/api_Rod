import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'; // Esto habilita Express.Multer.File

import { ClientService } from './client.service';
import { cliente_email, proveedor_email } from 'src/common/interfaces/email.interface';

@Controller('sendEmail')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('cliente')
  @UseInterceptors(FileInterceptor('Documento'))
  email_cliente(
    @Body() Data: cliente_email,
    @UploadedFile() Documento: Express.Multer.File, 
  ) {
    //const { Fecha, Correo, Cliente, Documento, subject } = Data;
    const { Fecha, Correo, Cliente, subject } = Data;
    return this.clientService.email_cliente(Correo, Cliente, Documento, subject);
  }

}
