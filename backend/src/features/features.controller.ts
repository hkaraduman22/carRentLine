import { Controller,Get,Post,Body } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateCarFeatureDto } from './dto/create-feature.dto';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  create(@Body() CreateCarFeatureDto:CreateCarFeatureDto){

    return this.featuresService.create(CreateCarFeatureDto);
  }

  @Get()
  findAll(){
    return this.featuresService.findAll()
  }
}