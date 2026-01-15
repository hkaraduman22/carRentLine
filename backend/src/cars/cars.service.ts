import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CarsService { 
  constructor(private prisma: PrismaService) {}
 
  async create(createCarDto: CreateCarDto) {
    const { featureIds, ...carData } = createCarDto;
  
    return this.prisma.car.create({
      data: {
        ...carData,  
        features: {
          connect: featureIds?.map((id) => ({ id })), 
        },
      },
      include: { features: true }, 
    });
  }
 
  async findAll(filterDto: GetCarsFilterDto = {}) { // Varsayılan boş obje
    const { search, minPrice, maxPrice, features } = filterDto;
    
    const where: Prisma.CarWhereInput = {};

    // 1. Arama Filtresi
    if (search) {
        where.OR = [
            { brand: { contains: search } }, 
            { model: { contains: search } },
        ];
    }

    // 2. Fiyat Filtresi
    if (minPrice || maxPrice) {
        where.pricePerDay = {};
        if (minPrice) where.pricePerDay.gte = Number(minPrice);
        if (maxPrice) where.pricePerDay.lte = Number(maxPrice);
    }

    // 3. Özellik Filtresi
    if (features) {
        const featureList = features.split(',').filter(f => f);
        if (featureList.length > 0) {
            where.features = {
                some: {
                    name: { in: featureList }
                }
            };
        }
    }

    return this.prisma.car.findMany({
      where, 
      include: { features: true },  
      orderBy: { id: 'desc' }       
    });
  }
 
  async findOne(id: number) {
    return this.prisma.car.findUnique({
      where: { id },
      include: { features: true },
    });
  }
 
 async update(id: number, updateCarDto: UpdateCarDto) {
    const { featureIds, ...carData } = updateCarDto;  

    return this.prisma.car.update({
      where: { id },
      data: {
        ...carData, 
        ...(featureIds && {
            features: { set: featureIds.map((fid) => ({ id: fid })) }
        }),
      },
      include: { features: true },
    });
  }
 
  remove(id: number) {
    return this.prisma.car.delete({
      where: { id },
    });
  }
}