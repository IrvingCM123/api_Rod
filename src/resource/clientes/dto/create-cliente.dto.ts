import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClienteDto {

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

  @ApiProperty({
    description: 'Fecha de registro del cliente (autogenerada)',
    type: Date,
    example: '2024-01-01T00:00:00Z',
    default: new Date().toISOString(),
    readOnly: true,
  })
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  cliente_Fecha_Registro?: Date;
}
