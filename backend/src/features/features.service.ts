import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCarFeatureDto } from './dto/create-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) { // createFeatureDto
    return this.prisma.feature.create({ data });
  }

  // Admin panelindeki "Araç Ekle" kısmında özelliklerin listelenmesi için bu ŞART
  findAll() {
    return this.prisma.feature.findMany();
  }

  findOne(id: number) {
    return this.prisma.feature.findUnique({ where: { id } });
  }
}