import { Controller,Get,Post,Body,UseGuards,Request } from "@nestjs/common";
import { ReserVationsService } from "./reservations.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('reservations')
export class ReservationsController{

    //SADECE DEGİSMESİNE İZİN VAR
    constructor(private readonly reservationsService:ReserVationsService){}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    //BODY e bak

    //FOREİGN KEY
    create(@Body() dto:CreateReservationDto,@Request() req){

        return this.reservationsService.create(dto,req.user.userId)
    }

    @Get('my-reservations')
  @UseGuards(AuthGuard('jwt'))
  findManyReservations(@Request() req){

    return this.reservationsService.findMyreservations(req.user.userId)
  }

  //HERKESE ACIK YAPTIM TEST İCİN DUZELTMEYİ UNUTMA
  @Get()

  findAll(){
    return this.reservationsService.findAll();
  }


}
