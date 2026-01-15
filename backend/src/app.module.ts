import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { ReservationsModule } from './reservations/reservations.module';
import { MessagesModule } from './messages/messages.module';
import { FeaturesModule } from './features/features.module'; // <-- EKLE

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    CarsModule, 
    ReservationsModule, 
    MessagesModule,
    FeaturesModule // <-- EKLE
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}