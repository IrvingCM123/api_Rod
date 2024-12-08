import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Mensajes_Generales } from 'src/common/helpers/general.helpers';
import { Mensajes_Error_Registro } from 'src/common/helpers/registro.helpers';

export class RegisterDto {

    @ApiProperty({
        description: 'Nombre de usuario',
        example: 'Rodrigo',
        type: String,
        required: true,
    })
    @IsString()
    @MaxLength(50, {message: Mensajes_Generales.TAMAÑO_MAXIMO})
    Nombre: string;

    @ApiProperty({
        description: 'Apellidos de usuario',
        example: 'Rodriguez',
        type: String,
        required: true,
    })
    @IsString()
    @MaxLength(50, {message: Mensajes_Generales.TAMAÑO_MAXIMO})
    Apellidos: string;

    @ApiProperty({
        description: 'Debe ser un correo electrónico válido. Acepta letras, números y caracteres especiales como . _ % + -',
        example: 'Rodrigo@Gmail.com',
        type: String,
        required: true,
    })
    @IsNotEmpty()
    @Matches(/^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, {
        message: Mensajes_Error_Registro.MENSAJE_IDENTIFICADOR,
    }) 
    Correo_electronico: string;
    
    @ApiProperty({
        description: 'Contraseña entre 8 y 20 caracteres',
        example: 'MiC0ntraseñ@123',
        type: String,
        required: true,
    })
    @IsString()
    @MinLength(8, {message: Mensajes_Generales.TAMAÑO_MINIMO})
    @MaxLength(20, {message: Mensajes_Generales.TAMAÑO_MAXIMO})
    @Transform(({ value }) => value.trim()) // Eliminar espacios en blanco
    Contraseña : string;

    @ApiProperty({
        description: 'Fecha de registro de la cuenta',
        type: Date,
        required: false,
        default: ''
    })
    @IsOptional()
    @Transform(({ value }) => new Date(value))
    cuenta_Fecha_Registro?: Date; // El sistema la detecta por default

}
