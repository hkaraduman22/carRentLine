import { IsOptional,IsString,IsNumber,IsIn } from "class-validator";
import { Type } from "class-transformer";
export class FindCarsDto{
    @IsOptional()
    @IsString()
    brand?:string;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    minYear?:number;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    minpricePerDay?:number;

@IsOptional()
    @Type(()=>Number)
    @IsNumber()
    maxpricePerDay?:number;
    
    @IsOptional()
    @IsIn(['asc','desc'])
    sort?:'asc'|'desc'
    
}