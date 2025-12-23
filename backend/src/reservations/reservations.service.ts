import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { CreateCarDto } from "src/cars/dto/create-car.dto";

@Injectable()
export class ReserVationsService{

    constructor(private prisma:PrismaService){}

    async create(CreateReservationDto:CreateReservationDto,userId:number){
        return this.prisma.reservation.create({

            data:{
                startDate:new Date(CreateReservationDto.startDate), //STRİNGTEN DATEYE ÇEVİR //HATA ALDIGIM KISIM BURASIYDI JSONDA TARİH YOKMUS

                endDate:new Date(CreateReservationDto.endDate),
                totalPrice:CreateReservationDto.totalPrice,
                status:'PENDING' ,

                //REFERANS KEYLER
                carId:CreateReservationDto.carId,
                //TOKENDEN GELEN KULLANICI
                userId:userId
            },

            //SONUÇTA SADECE ARABA VE KULLANICI DEĞERLERİNİ GÖSTERECEĞİM
            include:{
                car:true,
                user:true
            }




        });
    }

    async findAll(){

        return this.prisma.reservation.findMany({
        include:{car:true,user:true},
        orderBy:{createdAt:'desc'}
        });
    }

    async findMyreservations(userId:number){
        return this.prisma.reservation.findMany({

            where:{userId:userId},
            include:{car:true},
            orderBy:{startDate:'desc'}

        });
    }
}