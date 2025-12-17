import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FindCarsDto } from './dto/find-cars.dto';

@Injectable()

export class CarService{

  constructor(private prisma:PrismaService) {}


  //EKLE
  create(dto:CreateCarDto){
    return this.prisma.car.create({data:dto});

  }
// LİSTELEME (filtre ve sıralama)
  findAll(query: FindCarsDto) {
  return this.prisma.car.findMany({
    where: {
      ...(query.brand && { brand: query.brand }),
      ...(query.minYear && { year: { gte: query.minYear } }),
      ...(query.minpricePerDay && { pricePerDay: { lte: query.maxpricePerDay } }),
    },
    orderBy: {
      pricePerDay: query.sort ?? 'asc',
    },
  });
}

  //ARA
  findOne(id:number){
    return this.prisma.car.findUnique({where:{id}});
  }

  //GÜNCELLE
  update(id:number,dto:UpdateCarDto){
    return this.prisma.car.update({where:{id},data:dto});
  }

  //SİL
  remove(id:number){

    return this.prisma.car.delete({where:{id}})
  }


}
 