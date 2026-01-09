import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

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
 
  async findAll() {
    return this.prisma.car.findMany({
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