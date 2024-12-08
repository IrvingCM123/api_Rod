import { DetalleVenta } from 'src/resource/detalle-ventas/entities/detalle-venta.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('ventas')
export class Venta {

	@PrimaryGeneratedColumn()
	venta_ID: number;

	// Campo de tipo Fecha que se registra automaticamente.
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    venta_Fecha_Registro?: Date;

	@OneToOne(() => DetalleVenta, { eager: true, cascade: true })
    @JoinColumn({ name: 'detalle_Venta_ID' })
    venta_DetalleVenta_ID?: DetalleVenta;

}
