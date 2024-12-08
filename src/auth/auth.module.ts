import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/jwt.constant';
import { CuentasModule } from 'src/resource/cuentas/cuentas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from 'src/resource/cuentas/entities/cuenta.entity';

@Module({
  imports: [
    // Sintaxis que permite general tokens JWT
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    CuentasModule,
    TypeOrmModule.forFeature([Cuenta]),
  ],
  controllers: [AuthController], // Controlador seleccionado para el módulo de inicio de sesión
  providers: [AuthService]  // Servicio seleccionado para el módulo de inicio de sesión
})
export class AuthModule {}
