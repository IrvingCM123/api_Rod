import { Roles } from "../enums/roles.enum";

export interface Login {
    correo: string;
    contrasena: string;
}

export interface interfaz_Registro_Cuenta {
    cuenta_Nombre: string;
    cuenta_Apellido: string;
    cuenta_Correo: string;
    cuenta_Contrasena: string;
    cuenta_Rol: Roles;
    cuenta_Fecha_Registro: Date;
}
