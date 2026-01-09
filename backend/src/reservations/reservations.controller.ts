import { Controller, Get, Post, Body, UseGuards, Request } from "@nestjs/common";
import { ReserVationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('reservations')
export class ReservationsController {

    constructor(private readonly reservationsService: ReserVationsService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() dto: CreateReservationDto, @Request() req) {
        
        return this.reservationsService.create(dto, req.user.userId);
    }
 
    @Get('my') 
    @UseGuards(AuthGuard('jwt'))
    findManyReservations(@Request() req) {
        return this.reservationsService.findMyreservations(req.user.userId);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll() {
        return this.reservationsService.findAll();
    }
}