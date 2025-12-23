
import { IsString,IsNotEmpty } from "class-validator";

export class CreateCarFeatureDto{
    @IsString()
    @IsNotEmpty({message:'Ozellik bos olamaz!'})
    name:string
}