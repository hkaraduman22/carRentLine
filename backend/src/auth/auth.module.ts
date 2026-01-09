// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';  
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
imports:[
UsersModule,
PassportModule,
JwtModule.register({
  secret:'ca117fa4',
  signOptions:{expiresIn:'1h'}, 
})
],

  controllers: [AuthController],
  providers: [AuthService, PrismaService,
    JwtStrategy
  ],  
})
export class AuthModule {}

