import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCarFeatureDto } from './dto/create-feature.dto';
import { features } from 'process';

@Injectable()
export class FeaturesService {
    constructor(private prisma:PrismaService){}

    //ekleme yaparken dto dan çek frontend ile uyumlu olsun
    async create(CreateCarFeatureDto:CreateCarFeatureDto){

        return this.prisma.feature.create({

         data:CreateCarFeatureDto
        });
    }

    async findAll(){

        return this.prisma.feature.findMany()
    }

    async findOne(id:number){

        
        const car=await this.prisma.car.findUnique({
            where:{id},
            include:{features:true}//özelliklerini de gösersin
        });
    }
}
