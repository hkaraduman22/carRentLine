import { Module } from '@nestjs/common';
import { ReserVationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReserVationsService, PrismaService],
})
export class ReservationsModule {}