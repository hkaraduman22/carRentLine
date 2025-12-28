import { IsEmail,IsNotEmpty,MinLength,IsDefined,IsString, } from "class-validator";


//backend giris dto su

 

export class LoginDto{
    //VERi e-posta mi ona bakiyoruz
    @IsEmail({},{message:'Lutfen gecerli bir eposta giriniz'})
    email:string;

    //sifre bos mu ve en az 6 karakterli mi kontrol ediyoruz

     @IsDefined({ message: "Şifre alanı zorunludur" })
  @IsString({ message: "Şifre metin olmalıdır" })
  @IsNotEmpty({ message: "Şifre boş bırakılamaz" })
  @MinLength(6, { message: "Şifre en az 6 karakter olmalı" })
    
    password:string
}