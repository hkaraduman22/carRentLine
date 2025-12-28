import { Decimal } from "@prisma/client/runtime/library";
import { Type } from "class-transformer";
import { IsDecimal, IsNumber,IsString,Min ,Max, IsOptional,IsArray} from "class-validator";

export class CreateCarDto {
    @IsString()
    brand:string;
    @IsString()
    model:string;

    
  @IsNumber({},{message:'Lutfen sayi giriniz'})
  @Min(0,{message:'Lutfen pozitif bir deger giriniz'})

  @Type(()=>Number)//GELEN VERİYİ SAYİYA CEVİR
  km: number;

  @IsNumber({},{message:'LUTFEN SAYİ GİRİNİZ'})
  @Min(1000,{message:'lutfen gercekci bir deger giriniz!'})
  @Type(()=>Number)//HATA VEREN KİSİM BU
   pricePerDay:number


   @IsNumber()
   @Min(1930,{message:'Lutfen gecerli bir tarih giriniz'})
   year:number

   //ARABA FEATURES İDLERİ EKLEME
   @IsOptional()
   @IsArray()
   @IsNumber({},{each:true})
   featureIds?:number[];

}