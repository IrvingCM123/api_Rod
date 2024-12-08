import { Injectable } from '@nestjs/common';

import { enviar_Email } from './methods/sendEmail.function';
import { enviar_cliente } from './methods/enviar_cliente.function';
import { respuestaInterface } from 'src/common/interfaces/respuesta.interface';

@Injectable()
export class ClientService {

  async email_cliente(Correo: string, Cliente: string, Documento: any, subject: string) {

    const fecha_Envio = new Date(); 

    const construir_template = await enviar_cliente(fecha_Envio, Cliente);

    await enviar_Email(Correo, construir_template.template_email, subject, Documento);

    const respuesta: respuestaInterface = {
      httpStatusCode: 201,
      mensajeRespuesta: 'Email sent successfully'
    }

    return respuesta;
  }


}
