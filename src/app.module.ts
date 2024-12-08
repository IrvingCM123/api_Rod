import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importación necesaria para configurar el ORM de NestJS
import { TypeOrmModule } from '@nestjs/typeorm';
// Importación para acceder a las variables de entorno
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

// Importación de los módulos que se declaran en la API
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './resource/productos/productos.module';
import { VentasModule } from './resource/ventas/ventas.module';
import { DetalleVentasModule } from './resource/detalle-ventas/detalle-ventas.module';
import { ClientesModule } from './resource/clientes/clientes.module';
import { ClientModule } from './client/client.module';

// Declarar el servicio para acceder a las variales de entorno
const configService: ConfigService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get<string>('PG_HOST'),
      port: parseInt(configService.get<string>('PG_PORT'),),
      username: configService.get<string>('PG_USER'),
      password: configService.get<string>('PG_PASSWORD'),
      database: configService.get<string>('PG_DATABASE'),
      synchronize: true, // Mapear o Crear las tablas definidas en los .entity
      autoLoadEntities: true, // Cargar las entidades de forma automática
    }),
    AuthModule,
    ProductosModule,
    VentasModule,
    DetalleVentasModule, 
    ClientesModule,
    ClientModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
