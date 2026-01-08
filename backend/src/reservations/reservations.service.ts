import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";


@Injectable()
export class ReserVationsService {

    constructor(private prisma: PrismaService) {}

    async create(createReservationDto: CreateReservationDto, userId: number) {
        
        // 1. Önce arabayı bul (Fiyatını öğrenmek için)
        const car = await this.prisma.car.findUnique({
            where: { id: createReservationDto.carId }
        });

        if (!car) {
            throw new NotFoundException('Araba bulunamadı.');
        }
          
        // 2. Tarihleri çevir ve gün farkını hesapla
        const start = new Date(createReservationDto.startDate);
        const end = new Date(createReservationDto.endDate);

        // Tarih kontrolü
        if (end <= start) {
            throw new BadRequestException('Bitiş tarihi başlangıçtan sonra olmalıdır.');
        }

        // --- YENİ KISIM: ÇAKIŞMA KONTROLÜ ---
        // Veritabanına soruyoruz: "Bu arabanın, benim istediğim tarihlerle çakışan bir rezervasyonu var mı?"
        const conflict = await this.prisma.reservation.findFirst({
            where: {
                carId: createReservationDto.carId,
                // Çakışma Mantığı:
                // (Mevcut Başlangıç < Yeni Bitiş) VE (Mevcut Bitiş > Yeni Başlangıç)
                startDate: { lt: end },
                endDate: { gt: start }
            }
        });
        if (conflict) {
            // Eğer çakışma varsa hata fırlatıyoruz. Frontend bunu yakalayıp kullanıcıya gösterecek.
            throw new BadRequestException('Üzgünüz, seçtiğiniz tarihlerde bu araç zaten kiralanmış.');
        }

        
        // Gün farkı hesaplama (Milisaniye farkı / Günlük milisaniye)
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        // 3. Toplam Fiyatı Hesapla (Veritabanındaki Decimal tipi ile uyumlu olsun diye Number yapıyoruz)
        // car.pricePerDay veritabanından Decimal gelir, işlem yapabilmek için Number'a çeviriyoruz.
        const pricePerDay = Number(car.pricePerDay);
        const totalPrice = diffDays * pricePerDay;

        // 4. Kaydet
        return this.prisma.reservation.create({
            data: {
                startDate: start,
                endDate: end,
                totalPrice: totalPrice, // Hesapladığımız fiyatı buraya koyduk
                 
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
}