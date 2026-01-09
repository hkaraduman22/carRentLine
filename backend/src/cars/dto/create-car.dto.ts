import { Type } from "class-transformer";
import { IsNumber, IsString, IsOptional, IsArray, Min, IsUrl } from "class-validator";

export class CreateCarDto {
    @IsString()
    brand: string;

    @IsString()
    model: string;
 
    @IsNumber()
    @Min(0)
    @Type(() => Number) 
    km: number;

    @IsNumber()
    @Min(500,{message:'Lutfen gercekci bir fiyat giriniz'})
    @Type(() => Number)
    pricePerDay: number;

    @IsNumber()
    @Min(1900,{message:'Tarih 1900 yilindan once olamaz!'})
    @Type(() => Number)
    year: number;
 
    @IsOptional()
    @IsArray()
    @Type(() => Number)
    @IsNumber({}, { each: true })
    featureIds?: number[];

    @IsUrl()
    imageUrl:string 
}