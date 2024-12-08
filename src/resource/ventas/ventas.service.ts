import { Injectable } from '@nestjs/common';

//Importación de los DTO a utilizar en el servicio
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { CreateDetalleVentaDto } from '../detalle-ventas/dto/create-detalle-venta.dto';

import { Exito_Operaciones, Errores_Operaciones } from 'src/common/helpers/operaciones.helpers';

// Bibliotecas para utlilizar los repository
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importar la entidad para utilizar en el repository
import { Venta } from './entities/venta.entity';

//Importar el servicio de crear detalle de venta
import { DetalleVentasService } from '../detalle-ventas/detalle-ventas.service';

// Interfaz para estandarizar la respuesta de salida
import { respuestaInterface } from 'src/common/interfaces/respuesta.interface';

@Injectable()
export class VentasService {

  constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
    private _detalleVentaService: DetalleVentasService
  ) { }

  async create(createVentaDto: CreateVentaDto) {

    try {

      const objetoVenta: CreateDetalleVentaDto = {
        detalleVenta_TotalProductosVendidos: createVentaDto.detalleVenta_TotalProductosVendidos,
        detalleVenta_MontoTotal: createVentaDto.detalleVenta_MontoTotal,
        detalleVentaCorreoCliente: createVentaDto.detalleVentaNombreCliente,
        detalleVentaNombreCliente: createVentaDto.detalleVentaNombreCliente,
        producto_ID: createVentaDto.producto_ID
      }

      const respuestaDetalleVenta: respuestaInterface = await this._detalleVentaService.create(objetoVenta);

      if (respuestaDetalleVenta.httpStatusCode != 201) {

        return respuestaDetalleVenta.mensajeRespuesta;

      } else {

        try {

          const objeto_Venta = {
            venta_DetalleVenta_ID: respuestaDetalleVenta.mensajeRespuesta,
          }

          await this.ventaRepository.save(objeto_Venta);

          const respuesta: respuestaInterface = {
            httpStatusCode: 201,
            mensajeRespuesta: Exito_Operaciones.Crear
          };

          return respuesta;

        } catch (error) {

          const respuesta: respuestaInterface = {
            httpStatusCode: 201,
            mensajeRespuesta: Errores_Operaciones.EROR_CREAR
          };

          return respuesta;
        }
      }

    } catch (error) {
      const respuesta: respuestaInterface = {
        httpStatusCode: 201,
        mensajeRespuesta: Errores_Operaciones.EROR_CREAR
      };

      return respuesta;
    }

  }

  async findAll() {
    const respuesta: respuestaInterface = {
      httpStatusCode: 201,
      mensajeRespuesta: await this.ventaRepository.find()
    };
    return respuesta;
  }

  async findOne(id: number) {

    const venta_Existente = await this.ventaRepository.findOneBy({
      venta_ID: id
    });

    if (!venta_Existente) {

      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
      }

      return respuesta;
    }

    const respuesta: respuestaInterface = {
      httpStatusCode: 201,
      mensajeRespuesta: venta_Existente
    };

    return respuesta;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  async remove(id: number) {
    try {

      const venta_Existente = await this.ventaRepository.findOneById(id.toString());

      if (!venta_Existente) {

        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
        }

        return respuesta;
      }

      await this.ventaRepository.delete(id);

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
