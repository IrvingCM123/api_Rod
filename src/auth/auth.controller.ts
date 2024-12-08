import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/registro.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Inicio_Sesion')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('registrarCuenta')
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('iniciarSesion')
  login(
    @Body()  loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }


}
