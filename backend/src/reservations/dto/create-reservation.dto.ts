import { IsNumber,IsDateString,Min, min } from "class-validator";
import { Type } from "class-transformer";

export class CreateReservationDto{

    @IsDateString({},{message:'Gecerli bir baslangic tarihi giriniz'})
    startDate:string

    @IsDateString({},{message:'Lutfen gecerli bir tarih giriniz'})
    endDate:string

    @IsNumber({},{message:'Lutfen sayi giriniz'})
    @Min(1000,{message:'Lutfen gercekci bir deger giriniz'})
    @Type(()=>Number)
    totalPrice:number

    @IsNumber()
    //HATA VERDİ BUNU NEDEN KULLANDIK BILMIYORUM
    @Type(() => Number)
    carId:number

}