import { Injectable, Logger } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { User_Interface } from 'src/common/interfaces/user.interface';

import { Cuenta } from './entities/cuenta.entity';

@Injectable()
export class CuentasService {

  private readonly logger = new Logger('TrabajadoresService');

  constructor(
    @InjectRepository(Cuenta)
    private cuentaRepository: Repository<Cuenta>,  ) {}

  create(createCuentaDto: CreateCuentaDto) {
    return 'This action adds a new cuenta';
  }

  findAll() {
    return this.cuentaRepository.find();
  }

  async findOne(correo: string) {
  }

  async update(correo: string, updateCuentaDto: UpdateCuentaDto, user: User_Interface) {
  }

  async remove(correo: string, user: User_Interface) {
  }
}
