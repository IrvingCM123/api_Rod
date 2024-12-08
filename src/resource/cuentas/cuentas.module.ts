import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CuentasController } from './cuentas.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from 'src/resource/cuentas/entities/cuenta.entity';

@Module({
  controllers: [CuentasController],
  providers: [CuentasService],
  imports: [
    TypeOrmModule.forFeature([Cuenta])
  ],
  exports: [CuentasService],
})
export class CuentasModule {}
