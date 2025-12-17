import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsNumber,IsString,Min ,Max} from "class-validator";

export class CreateCarDto {
    @IsString()
    brand:string
    @IsString()
    model:string

    
  @IsNumber({},{message:'Lutfen sayi giriniz'})
  @Min(0,{message:'Lutfen pozitif bir deger giriniz'})

  km: number;

  @IsDecimal()
  @Min(1000,{message:'lutfen gercekci bir deger giriniz!'})
   pricePerDay:Decimal


   @IsNumber()
   @Min(1930,{message:'Lutfen gecerli bir tarih giriniz'})
   year:number
   

}
