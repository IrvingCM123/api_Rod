import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Roles } from "src/common/enums/roles.enum";

// Permite registrar una tabla con sus campos en una base de datos automaticamente
@Entity('cuenta')
export class Cuenta {

    @PrimaryGeneratedColumn()
    cuenta_ID: number;

    // Campo de tipo texto, con un límite de 50 caracteres. No acepta valores nullos
    @Column({ type: 'varchar', length: 50, nullable: false })
    cuenta_Nombre: string;

    // Campo de tipo texto, con un límite de 50 caracteres. No acepta valores nullos
    @Column({ type: 'varchar', length: 50, nullable: false })
    cuenta_Apellido: string;

    // Campo de tipo texto, con un límite de 30 caracteres. No acepta valores nullos y solo puede haber uno en el sistema
    @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
    cuenta_Correo: string;

    // Campo de tipo texto, con un límite de 255 caracteres. No acepta valores nullos y estará cifrado
    @Column({ type: 'varchar', length: 255, nullable: false })
    cuenta_Contrasena: string;

    // Campo para definir los roles de la cuenta (Solo hay uno actualmente), no acepta valores que no estén definidos en el Enum
    @Column({ type: 'enum', enum: Roles, nullable: false, default: Roles.ADMIN })
    cuenta_Rol: Roles;

    // Campo de tipo Fecha que se registra automaticamente.
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
    cuenta_Fecha_Registro?: Date;

}
