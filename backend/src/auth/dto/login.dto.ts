import { IsEmail,IsNotEmpty,MinLength,IsDefined,IsString, } from "class-validator";


 

 

export class LoginDto{
     
    @IsEmail({},{message:'Lutfen gecerli bir eposta giriniz'})
    email:string;
 

  @IsDefined({ message: "Şifre alanı zorunludur" })
  @IsString({ message: "Şifre metin olmalıdır" })
  @IsNotEmpty({ message: "Şifre boş bırakılamaz" })
  @MinLength(6, { message: "Şifre en az 6 karakter olmalı" })
    
    password:string
}