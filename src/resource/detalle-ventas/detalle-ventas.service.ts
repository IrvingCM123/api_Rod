import { Injectable } from '@nestjs/common';

//Importación de los DTO a utilizar en el servicio
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';

import { Exito_Operaciones, Errores_Operaciones } from 'src/common/helpers/operaciones.helpers';

import { ProductosService } from '../productos/productos.service';

// Bibliotecas para utlilizar los repository
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importar la entidad para utilizar en el repository
import { DetalleVenta } from './entities/detalle-venta.entity';
import { ProductoVenta } from './entities/detalle-venta.entity';

// Interfaz para estandarizar la respuesta de salida
import { respuestaInterface } from 'src/common/interfaces/respuesta.interface';

@Injectable()
export class DetalleVentasService {

  constructor(
    private _productoSerive: ProductosService,
    @InjectRepository(DetalleVenta)
    private detalleVentaRepository: Repository<DetalleVenta>,
    @InjectRepository(ProductoVenta)
    private productoVentaRepository: Repository<ProductoVenta>,
    
  ) { }

  async create(createDetalleVentaDto: CreateDetalleVentaDto) {

    // Obtener todos los productos vendidos en el sistema
    const productoVenta = createDetalleVentaDto.producto_ID;
    const productos_registrados = []

    // Ir uno a uno de los productos que se han recibido para ser almacenados en la base de datos
    for (const producto of productoVenta) {

      try {
        // Intentar realizar el registro del producto en la base de datos
        await this._productoSerive.actualizarInventario(producto.productoVenta_ProductoID, producto.productoVenta_CantidadProducto)
        const registro_almacenado = await this.productoVentaRepository.save(producto);

        // Almacenar el objeto registrado en la base de datos para adjuntarlo al detalle de venta
        productos_registrados.push(registro_almacenado);
        
      } catch (error) {
        // Si algo sale mal, retornar un mensaje de error
        const respuesta: respuestaInterface = {
          httpStatusCode: 500,
          mensajeRespuesta: Errores_Operaciones.EROR_CREAR
        }

        return respuesta;
      }
    }

    // Creamos un objeto de tipo Detalle de venta para que los campos coincidan con los registrados en la BD
    const objetoDetalleVenta: DetalleVenta = {
      detalleVenta_ID: 0,
      detalleVenta_TotalProductosVendidos: createDetalleVentaDto.detalleVenta_TotalProductosVendidos,
      detalleVenta_MontoTotal: createDetalleVentaDto.detalleVenta_MontoTotal,
      detalleVentaCorreoCliente: createDetalleVentaDto.detalleVentaCorreoCliente,
      detalleVentaNombreCliente: createDetalleVentaDto.detalleVentaNombreCliente,
      detalleVenta_ProductoVenta_ID: productos_registrados
    };

    // Eliminar el campo ID del objeto para almacenarlo en la BD
    delete objetoDetalleVenta.detalleVenta_ID

    try {
      
      // Intentamos almacenar el detalle de venta en la base de datos
      const detalle_Venta_Almacenado = await this.detalleVentaRepository.save(objetoDetalleVenta);

      // Si sale bien, retornamos una respuesta para almacenar la venta posteriormente
      const respuesta: respuestaInterface = {
        httpStatusCode: 201,
        mensajeRespuesta: detalle_Venta_Almacenado
      };

      return respuesta;

    } catch (error) {
      
      // Si algo sale mal, retornar un mensaje de error
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
      mensajeRespuesta: await this.detalleVentaRepository.find()
    }

    return respuesta;
  }

  async findOne(id: number) {
    const detalleVenta_Encontrado = await this.detalleVentaRepository.findOneBy({
      detalleVenta_ID: id
    })

    if (!detalleVenta_Encontrado) {

      const respuesta: respuestaInterface = {
        httpStatusCode: 500,
        mensajeRespuesta: Errores_Operaciones.ERROR_INEXISTENTE
      }

      return respuesta;
    } 
    
    const respuesta: respuestaInterface = {
      httpStatusCode: 201,
      mensajeRespuesta: detalleVenta_Encontrado
    };

    return respuesta;
  }

  update(id: number, updateDetalleVentaDto: UpdateDetalleVentaDto) {
    return `This action updates a #${id} detalleVenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleVenta`;
  }
}
