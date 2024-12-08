import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('productos')
export class Producto {

	@PrimaryGeneratedColumn()
	producto_ID: number;

	// Campo de tipo texto, con un límite de 50 caracteres. No acepta valores nullos
    @Column({ type: 'varchar', length: 50, nullable: false })
	producto_Nombre: string;

	// Campo de tipo decimal. No acepta valores nullos
    @Column({ type: 'decimal', nullable: false })
    producto_Precio: number;

	// Campo de tipo numbero. No acepta valores nullos
    @Column({ type: 'int', nullable: false })
	producto_Cantidad: number;

	// Campo de tipo Fecha que se registra automaticamente.
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    producto_Fecha_Registro?: Date;
}

