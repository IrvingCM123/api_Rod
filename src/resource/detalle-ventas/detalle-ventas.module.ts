import { Module } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { DetalleVentasController } from './detalle-ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta, ProductoVenta } from './entities/detalle-venta.entity';
import { ProductosModule } from '../productos/productos.module';

@Module({
  controllers: [DetalleVentasController],
  providers: [DetalleVentasService],
  imports: [ TypeOrmModule.forFeature([DetalleVenta, ProductoVenta]), ProductosModule],
  exports: [ DetalleVentasService]
})
export class DetalleVentasModule {}
