import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService { 
  constructor(private prisma: PrismaService) {}

  // --- ARAÇ EKLEME (CREATE) ---
  async create(createCarDto: CreateCarDto) {
    // 1. Özellik ID'lerini (featureIds) veriden ayır.
    const { featureIds, ...carData } = createCarDto;

    // 2. Veritabanına kaydet.
    return this.prisma.car.create({
      data: {
        ...carData, // Marka, model, yıl, fiyat vb.
        
        // İlişkileri kur (Many-to-Many)
        features: {
          connect: featureIds?.map((id) => ({ id })), 
        },
      },
      include: { features: true }, // Cevap olarak özellikleri de döndür
    });
  }

  // --- TÜMÜNÜ LİSTELE ---
  async findAll() {
    return this.prisma.car.findMany({
      include: { features: true }, // Özellikleri de getir
      orderBy: { id: 'desc' }      // En son eklenen en üstte
    });
  }

  // --- TEK ARAÇ BUL ---
  async findOne(id: number) {
    return this.prisma.car.findUnique({
      where: { id },
      include: { features: true },
    });
  }

  // --- GÜNCELLE ---
 async update(id: number, updateCarDto: UpdateCarDto) {
    const { featureIds, ...carData } = updateCarDto; // ID'leri ayır

    return this.prisma.car.update({
      where: { id },
      data: {
        ...carData,
        // İlişkileri güncelle (Set mantığı: eskileri siler yenileri ekler)
        ...(featureIds && {
            features: { set: featureIds.map((fid) => ({ id: fid })) }
        }),
      },
      include: { features: true },
    });
  }

  // --- SİL ---
  remove(id: number) {
    return this.prisma.car.delete({
      where: { id },
    });
  }
}