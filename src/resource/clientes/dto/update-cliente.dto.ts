import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
	
	@ApiProperty({
		description: 'Nombre del cliente',
		type: String,
		required: true,
		example: 'Juan Pérez',
		maxLength: 50,
	})
	@IsString()
	@IsNotEmpty()
	cliente_Nombre: string;

	@ApiProperty({
		description: 'Teléfono del cliente',
		type: String,
		required: true,
		example: '1234567890',
		maxLength: 12,
	})
	@IsString()
	@IsNotEmpty()
	cliente_Telefono: string;

	@ApiProperty({
		description: 'Correo único del cliente',
		type: String,
		required: true,
		example: 'Cliente1@Gmail.com',
		maxLength: 30,
	})
	@IsString()
	@IsNotEmpty()
	cliente_Correo: string;

	@ApiProperty({
		description: 'Dirección del cliente',
		type: String,
		required: true,
		example: 'Calle Falsa 123',
		maxLength: 50,
	})
	@IsString()
	@IsNotEmpty()
	cliente_Direccion: string;
}
