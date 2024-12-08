// Importaciones por defualt
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Validaciones para mensajes de error o impresiones en consola
import { Logger, ValidationPipe } from '@nestjs/common';
// Importaciones para crear la documentación automática
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//Importación para aumentar el tamaño del objeto entrante al servidor
import * as bodyParser from 'body-parser';

// Importación para utilizar las variables de entorno
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true } );

  app.use(bodyParser.json({ limit: '50mb' }));  // Aumenta el tamaño permitido de las peticiones ()
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); //Permite que en la URl el tamaño también aumente

  //Habilitar CORS para que el servidor pueda ser accedido desde cualquier origen
  app.enableCors();

  //Establecer el prefijo para las rutas de la Api
  app.setGlobalPrefix('servidor');

  // Habilitar Logger de NestJS (Documentación automática)
  const logger = new Logger('Bootstrap');

  //Configurar la documentación de Swagger 
  const options = new DocumentBuilder()
    .setTitle('API de Ventas')
    .setDescription('Documentación de la API de Ventas')
    .setVersion('1.0')
    .addTag('Ventas')
    .build();

  // Crear el documento de Swagger 
  const document = SwaggerModule.createDocument(app, options);

  // Establecer la ruta para acceder a la ruta de la documentación
  SwaggerModule.setup('docs', app, document);

  // Sintaxis necesaria para las validaciones de la Api (DTO y mensajes de error)
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    })
  );

  // Acceder a nuestras variables de entorno
  const configService: ConfigService = new ConfigService();

  // Obtener el valor del puerto del archivo .env
  const PUERTO = configService.get<string>('PUERTO');
  console.log(PUERTO)

  // Si el puerto no es establecido en el .env, se toma por default el puerto 3000
  await app.listen(PUERTO ?? 3000);
  logger.log('Aplicación en ejecución');

}
bootstrap();
