import { cliente_template } from "../template/cliente.template";

export function enviar_cliente(Fecha: any, Cliente: string) {
    let template_email = cliente_template(Fecha, Cliente);
    return { template_email };
}