import { IsNumber,IsDateString,Min, min } from "class-validator";
import { Type } from "class-transformer";

export class CreateReservationDto{

    @IsDateString({},{message:'Gecerli bir baslangic tarihi giriniz'})
    
    startDate:string

    @IsDateString({},{message:'Lutfen gecerli bir tarih giriniz'})
    endDate:string



    @IsNumber()
    //HATA VERDİ BUNU NEDEN KULLANDIK BILMIYORUM
    @Type(() => Number)
    carId:number


    

}