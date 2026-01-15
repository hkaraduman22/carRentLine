import { IsNumber, IsDateString, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateReservationDto {

    @IsNotEmpty({ message: 'Başlangıç tarihi boş olamaz' })
    @IsDateString({}, { message: 'Geçerli bir başlangıç tarihi giriniz (ISO 8601)' })
    startDate: string;

    @IsNotEmpty({ message: 'Bitiş tarihi boş olamaz' })
    @IsDateString({}, { message: 'Geçerli bir bitiş tarihi giriniz (ISO 8601)' })
    endDate: string;

    @IsNotEmpty({ message: 'Araç ID boş olamaz' })
    @IsNumber({}, { message: 'Araç ID sayı olmalıdır' })
    @Type(() => Number) // String gelirse (örn: "15") otomatik sayıya çevirir
    carId: number;
}