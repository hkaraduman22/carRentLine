import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCarFeatureDto } from './dto/create-feature.dto';

@Injectable()
export class FeaturesService {
    constructor(private prisma:PrismaService){}

    async create(CreateCarFeatureDto:CreateCarFeatureDto){

        return this.prisma.feature.create({

         data:CreateCarFeatureDto
        });
    }

    async findAll(){

        return this.prisma.feature.findMany()
    }
}
