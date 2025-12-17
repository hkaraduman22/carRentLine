import { Module } from '@nestjs/common';
import { CarService } from './cars.service';
import { CarsController } from './cars.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [CarsController],
  providers: [CarService,PrismaService],
})
export class CarsModule {}
