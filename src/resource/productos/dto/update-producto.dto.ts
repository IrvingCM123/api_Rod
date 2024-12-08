import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
	@ApiProperty({
		description: 'Nombre del producto',
		type: String,
		required: true,
		example: 'Galletas Marias',
	})
	@IsString()
	@IsNotEmpty()
	producto_Nombre: string;

	@ApiProperty({
		description: 'Precio del producto',
		type: Number,
		required: true,
		example: 46.90,
	})
	@IsNumber()
	@IsNotEmpty()
	producto_Precio: number;

	@ApiProperty({
		description: 'Cantidad del producto',
		type: Number,
		required: true,
		example: 100,
	})
	@IsNumber()
	@IsNotEmpty()
	producto_Cantidad: number;
}
