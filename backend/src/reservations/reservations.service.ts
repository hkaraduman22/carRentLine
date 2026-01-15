import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";


@Injectable()
export class ReserVationsService {

    constructor(private prisma: PrismaService) {}

    async create(createReservationDto: CreateReservationDto, userId: number) {
         
        const car = await this.prisma.car.findUnique({
            where: { id: createReservationDto.carId }
        });

        if (!car) {
            throw new NotFoundException('Araba bulunamadı.');
        }
           
        const start = new Date(createReservationDto.startDate);
        const end = new Date(createReservationDto.endDate);
 
        if (end <= start) {
            throw new BadRequestException('Bitiş tarihi başlangıçtan sonra olmalıdır.');
        }
 
        const conflict = await this.prisma.reservation.findFirst({
            where: {
                carId: createReservationDto.carId,
                
                startDate: { lt: end },
                endDate: { gt: start }
            }
        });
        if (conflict) { 
            throw new BadRequestException('Üzgünüz, seçtiğiniz tarihlerde bu araç zaten kiralanmış.');
        }

         
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
 
        const pricePerDay = Number(car.pricePerDay);
        const totalPrice = diffDays * pricePerDay;

       
        return this.prisma.reservation.create({
            data: {
                startDate: start,
                endDate: end,
                totalPrice: totalPrice,  
                 
                carId: createReservationDto.carId,
                userId: userId
            },
            include: {
                car: true,
                user: true
            }
        });
    }

    async findAll() {
        return this.prisma.reservation.findMany({
            include: { car: true, user: true },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findMyreservations(userId: number) {
        return this.prisma.reservation.findMany({
            where: { userId: userId },
            include: { car: true },
            orderBy: { startDate: 'desc' }
        });
    }
    async remove(id: number) {
        return this.prisma.reservation.delete({
            where: { id }
        });
    }
}