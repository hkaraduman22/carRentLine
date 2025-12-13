// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service'; // 1. İMPORT ET

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService] // 2. BURAYA EKLE
})
export class AuthModule {}