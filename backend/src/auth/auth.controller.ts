// src/auth/auth.controller.ts

// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth') // 1. Ana Kapı Adresi: localhost:3000/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // 2. Oda Numarası: /register
  // TAM ADRES: http://localhost:3000/auth/register
  async register(@Body() body: RegisterDto) {
    // 3. Kapıdaki görevli (Controller), paketi (body) alır ve mutfağa (Service) iletir.
    return this.authService.register(body);
  }
}