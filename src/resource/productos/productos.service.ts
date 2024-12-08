import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';

//Importación de los DTO a utilizar en el servicio
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

import { Exito_Operaciones, Errores_Operaciones } from 'src/common/helpers/operaciones.helpers';

// Bibliotecas para utlilizar los repository
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importar la entidad para utilizar en el repository
import { Producto } from './entities/producto.entity';

// Interfaz para estandarizar la respuesta de salida
import { respuestaInterface } from 'src/common/interfaces/respuesta.interface';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>
  ) { }

  async create(createProductoDto: CreateProductoDto) {

    try {

      const producto_Existente = await this.findOneByNombre(createProductoDto.producto_Nombre);

      if (producto_Existente) {

        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Errores_Operaciones.ERROR_DUPLICADO
        }

        return respuesta;
      } else {

        await this.productoRepository.save(createProductoDto);

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
      mensajeRespuesta: await this.productoRepository.find()
    };
    return respuesta;
  }

  async findOne(id: number) {

    const producto_Existente = await this.productoRepository.findOneBy({
      producto_ID: id
    });

    if (!producto_Existente) {

      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
      }

      return respuesta;
    }

    const respuesta: respuestaInterface = {
      httpStatusCode: 201,
      mensajeRespuesta: producto_Existente
    };

    return respuesta;
  }

  async findOneByNombre(nombre: string) {
    return await this.productoRepository.findOneBy({
      producto_Nombre: nombre
    })
  };

  async actualizarInventario(id: number, cantidadRestar: number) {
    try {

      const producto_Existente = await this.findOne(id);

      if (!producto_Existente) {

        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
        }

        return respuesta;
      }

      producto_Existente.mensajeRespuesta.producto_Cantidad = producto_Existente.mensajeRespuesta.producto_Cantidad  - cantidadRestar;

      await this.productoRepository.update(id, producto_Existente.mensajeRespuesta);

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

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    try {

      const producto_Existente = await this.findOne(id);

      if (!producto_Existente) {

        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
        }

        return respuesta;
      }

      await this.productoRepository.update(id, updateProductoDto);

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

      const producto_Existente = await this.findOne(id);

      if (!producto_Existente) {

        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
        }

        return respuesta;
      }

      await this.productoRepository.delete(id);

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
