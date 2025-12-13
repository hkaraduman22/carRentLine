// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service'; // EKLENDİ

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService] // EKLENDİ
})
export class AuthModule {}