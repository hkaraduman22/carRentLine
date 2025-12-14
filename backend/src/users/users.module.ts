import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service'; // 1. Prisma'yı import et

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    PrismaService // 2. Prisma'yı sağlayıcılar listesine ekle
  ],
  exports: [UsersService] // 3. AuthModule kullanabilsin diye UsersService'i dışarı aç
})
export class UsersModule {}