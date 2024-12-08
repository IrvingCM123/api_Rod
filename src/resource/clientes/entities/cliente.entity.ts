import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('clientes')
export class Cliente {

	@PrimaryGeneratedColumn()
	cliente_ID: number;

	// Campo de tipo texto, con un límite de 50 caracteres. No acepta valores nullos
    @Column({ type: 'varchar', length: 50, nullable: false })
	cliente_Nombre: string;

	// Campo de tipo texto, con un límite de 12 caracteres. No acepta valores nullos
    @Column({ type: 'varchar', length: 12, nullable: false })
	cliente_Telefono: string;

	// Campo de tipo texto, con un límite de 30 caracteres. No acepta valores nullos y solo puede haber uno en el sistema
    @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
    cliente_Correo: string;

	// Campo de tipo texto, con un límite de 50 caracteres. No acepta valores nullos
    @Column({ type: 'varchar', length: 50, nullable: false })
	cliente_Direccion: string;

	// Campo de tipo Fecha que se registra automaticamente.
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    cliente_Fecha_Registro?: Date;
}
