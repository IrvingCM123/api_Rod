import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Mensajes_Generales } from 'src/common/helpers/general.helpers';

import {
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class LoginDto {

    @ApiProperty({
        description: 'Debe ser un correo electrónico válido. Acepta letras, números y caracteres especiales como . _ % + -',
        example: 'Rodrigo@Gmail.com',
        format: 'Debe llevar los caracteres indicados de un email, es decir @ y .'
    })
    @IsNotEmpty()
    @Matches(/^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, {
        message: Mensajes_Generales.CORREO_VALIDO_LOGIN,
    }) 
    Correo_electronico: string;

    @ApiProperty({
        description: 'Contraseña entre 8 y 20 caracteres',
        example: 'MiC0ntraseñ@123',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: Mensajes_Generales.TAMAÑO_MINIMO}) //Establecer un minímo de contraseña
    @MaxLength(20, {message: Mensajes_Generales.TAMAÑO_MAXIMO}) //Establecer un máximo de contraseña
    @Transform(({ value }) => value.trim()) // Eliminar espacios en blanco imprevistos
    Contraseña : string;

}
