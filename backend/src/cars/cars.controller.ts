import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query ,Put} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindCarsDto } from './dto/find-cars.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  //GİRİŞ YAPAN KULLANİCİ EKLEYEBİLİR
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateCarDto) {
    return this.carsService.create(dto);
  }

  //HERKESE AÇIK
  @Get()
   @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.carsService.findAll();
  }

  //TEKARABA
  @Get(':id')
   @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }
 
  //GÜNCELLE
  @Put(':id')
   @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }
   //SİL
  @Delete(':id')
   @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
