import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CarService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindCarsDto } from './dto/find-cars.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarService) {}

  //GİRİŞ YAPAN KULLANİCİ EKLEYEBİLİR
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateCarDto) {
    return this.carsService.create(dto);
  }

  //HERKESE AÇIK
  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  //TEKARABA
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }
 
  //GÜNCELLE
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }
   //SİL
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
