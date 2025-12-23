import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';
import { FeaturesModule } from './features/features.module';
import { ReservationsModule } from './reservations/reservations.module'; 

@Module({
  imports: [UsersModule, AuthModule, CarsModule, FeaturesModule,ReservationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
