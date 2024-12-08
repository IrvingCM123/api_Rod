import { Injectable } from '@nestjs/common';

// Importación de los DTO necesarios para el funcionamiento del inicio de sesión.
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/registro.dto';

// Importación para generar los token JWT
import { JwtService } from '@nestjs/jwt';

// Biblioteca para cifrar la contraseña de la cuenta
import * as bcrypt from 'bcrypt';

// Mensajes de error o éxito genericos
import { Mensajes_Error_Registro, Mensaje_Exito_Registro } from 'src/common/helpers/registro.helpers';
import { interfaz_Registro_Cuenta } from 'src/common/interfaces/login.interface';

// Bibliotecas para utlilizar los repository
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importaciones necesarias para crear cuentas o iniciar sesión
import { Cuenta } from 'src/resource/cuentas/entities/cuenta.entity';

// Importación de la interfaz para definir la respuesta
import { respuestaInterface } from 'src/common/interfaces/respuesta.interface';
import { Roles } from 'src/common/enums/roles.enum';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>, // Repositorio de tipo Cuenta
    private jwtService: JwtService, // Generar token de acceso al sistema
  ) { }

  // Registro de usuario
  async register(registroDTO: RegisterDto) {

    // Eliminar espacios en blanco recibidos y poner en minúsculas para evitar errores
    const correoRecibido = registroDTO.Correo_electronico.trim().toLowerCase();

    const cuentaExistente = await this.cuentaRepository.findOneBy({
      cuenta_Correo: correoRecibido,
    });

    // Si devuelve un resultado, la cuenta ya está registrada
    if (cuentaExistente) {

      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Mensajes_Error_Registro.CORREO_DUPLICADO
      }

      return respuesta;
    }

    const contraseña_cifrada = await bcrypt.hash(registroDTO.Contraseña, 10); // Cifrar la contraseña

    const fecha_creacion = new Date(); // Fecha de creación de la cuenta

    // Crear objeto de tipo Registro para almacenarlo en la base de datos
    const objetoCuentaRegistro: interfaz_Registro_Cuenta = {
      cuenta_Nombre: registroDTO.Nombre,
      cuenta_Apellido: registroDTO.Apellidos,
      cuenta_Correo: correoRecibido,
      cuenta_Contrasena: contraseña_cifrada,
      cuenta_Rol: Roles.ADMIN,
      cuenta_Fecha_Registro: fecha_creacion
    }

    try {
      // Intentar guardar el registro en la base de datos
      await this.cuentaRepository.save(objetoCuentaRegistro);

      const respuesta: respuestaInterface = {
        httpStatusCode: 201,
        mensajeRespuesta: Mensaje_Exito_Registro.REGISTRO_EXITOSO
      }

      return respuesta;

    } catch (error) {

      // Verificar si es un error específico de clave única
      if (error.code === '23505') { // Código típico para "unique constraint violation" en PostgreSQL

        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Mensajes_Error_Registro.CORREO_DUPLICADO
        }

        return respuesta;
      }

      // Manejar otros tipos de errores de la base de datos
      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Mensajes_Error_Registro.ERROR_INESPERADO
      }

      return respuesta;
    }

  }

  async login(loginDto: LoginDto) {

    // Eliminar espacios en blanco recibidos y poner en minúsculas para evitar errores
    const correoRecibido = loginDto.Correo_electronico.trim().toLowerCase();

    const cuentaExistente = await this.cuentaRepository.findOneBy({
      cuenta_Correo: correoRecibido,
    });

    // Si devuelve un resultado, la cuenta ya está registrada
    if (!cuentaExistente) {

      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Mensajes_Error_Registro.CORREO_INEXISTENTE
      };

      return respuesta;
    }

    // Se cifra la contraseña recibida en el inicio de sesión y se compara con la contraseña cifrada en la base de datos
    if (!(await bcrypt.compare(loginDto.Contraseña, cuentaExistente.cuenta_Contrasena))) {
      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: 'La contraseña ingresada no es correcta!'
      }

      return respuesta;
    }

    // El token generado o que se generará lleva consigo, o se le asigna, el correo y el rol del usuario
    const payload = { correo: cuentaExistente.cuenta_Correo, role: cuentaExistente.cuenta_Rol, usuario: cuentaExistente.cuenta_Nombre + ' ' + cuentaExistente.cuenta_Apellido };

    // Generamos el token de acceso al sistema
    const access_Token = await this.jwtService.signAsync(payload);

    const respuesta: respuestaInterface = {
      httpStatusCode: 201,
      mensajeRespuesta: access_Token
    };

    return respuesta;

  }

}
