import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
 
  @Post()
  @UseGuards(AuthGuard('jwt')) // Ekleme işlemi hala korumalı
  create(@Body() dto: CreateCarDto) {
    return this.carsService.create(dto);
  }
 
  @Get()
  // @UseGuards(AuthGuard('jwt')) -> KALDIRILDI: Admin paneli ve Anasayfa rahatça erişsin
  findAll(@Query() filterDto: GetCarsFilterDto) {
    return this.carsService.findAll(filterDto);
  }
 
  @Get(':id')
  // @UseGuards(AuthGuard('jwt')) -> KALDIRILDI: Detay sayfası için
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }
  
  @Put(':id')
  @UseGuards(AuthGuard('jwt')) // Güncelleme korumalı
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  } 

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) // Silme korumalı
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}