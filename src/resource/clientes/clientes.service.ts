import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';

//Importación de los DTO a utilizar en el servicio
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

import { Exito_Operaciones, Errores_Operaciones } from 'src/common/helpers/operaciones.helpers';

// Bibliotecas para utlilizar los repository
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importar la entidad para utilizar en el repository
import { Cliente } from './entities/cliente.entity';

// Interfaz para estandarizar la respuesta de salida
import { respuestaInterface } from 'src/common/interfaces/respuesta.interface';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>
  ) { }

  async create(createClienteDto: CreateClienteDto) {

    try {

      const cliente_Existente = await this.findOneByEmail(createClienteDto.cliente_Correo);

      if (cliente_Existente) {

        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Errores_Operaciones.ERROR_DUPLICADO
        }

        return respuesta;
      } else {

        await this.clienteRepository.save(createClienteDto);

        const respuesta: respuestaInterface = {
          httpStatusCode: 201,
          mensajeRespuesta: Exito_Operaciones.Crear
        };

        return respuesta;
      }

    } catch (error) {
      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Errores_Operaciones.EROR_CREAR
      }

      return respuesta;
    }
  }

  async findAll() {
    const respuesta: respuestaInterface = {
      httpStatusCode: 201,
      mensajeRespuesta: await this.clienteRepository.find()
    };
    return respuesta;
  }

  async findOne(id: number) {

    const cliente_Existente = await this.clienteRepository.findOneBy({
      cliente_ID: id
    });

    if (!cliente_Existente) {

      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
      }

      return respuesta;
    } 
    
    const respuesta: respuestaInterface = {
      httpStatusCode: 201,
      mensajeRespuesta: cliente_Existente
    };

    return respuesta;
  }

  async findOneByEmail(correo: string) {
    return await this.clienteRepository.findOneBy({
      cliente_Correo: correo
    })
  };

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    try {

      const cliente_Existente = await this.findOneByEmail(updateClienteDto.cliente_Correo);

      if (!cliente_Existente) {

        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
        }

        return respuesta;
      }

      await this.clienteRepository.update(id, updateClienteDto);

      const respuesta: respuestaInterface = {
        httpStatusCode: 201,
        mensajeRespuesta: Exito_Operaciones.Actualizar
      };

      return respuesta;

    } catch (error) {

      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Errores_Operaciones.ERROR_ACTUALIZAR
      };

      return respuesta;

    }
  }

  async remove(id: number) {
    try {

      const cliente_Existente = await this.clienteRepository.findOneById(id.toString());

      if (!cliente_Existente) {

        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
        }

        return respuesta;
      }

      await this.clienteRepository.delete(id);

      const respuesta: respuestaInterface = {
        httpStatusCode: 201,
        mensajeRespuesta: Exito_Operaciones.Eliminar
      };

      return respuesta;

    } catch (error) {

      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Errores_Operaciones.ERROR_ELIMINAR
      };

      return respuesta;

    }
  }
}
