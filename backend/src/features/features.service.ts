import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCarFeatureDto } from './dto/create-feature.dto';

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
}
