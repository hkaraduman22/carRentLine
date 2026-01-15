import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer"; // ✅ BU EKLENMELİ

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number) // ✅ BU SATIR EKSİKSE MESAJ GİTMEZ
    carId: number;
}