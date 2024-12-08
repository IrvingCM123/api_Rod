import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from '../detalle-ventas/entities/detalle-venta.entity';
import { DetalleVentasModule } from '../detalle-ventas/detalle-ventas.module';

@Module({
  controllers: [VentasController],
  providers: [VentasService],
  imports: [ TypeOrmModule.forFeature([Venta, DetalleVenta]), DetalleVentasModule],
  exports: [VentasService]
})
export class VentasModule {}
