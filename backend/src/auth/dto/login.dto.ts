
//backend giris dto su


import { IsEmail,IsNotEmpty,MinLength } from "class-validator";

export class LoginDto{
    //VERi e-posta mi ona bakiyoruz
    @IsEmail({},{message:'Lutfen gecerli bir eposta giriniz'})
    email:string;

    //sifre bos mu ve en az 6 karakterli mi kontrol ediyoruz

    @IsNotEmpty({message:'Sifre bos birakilmaz'})
    @MinLength(6,{message:'Sifre en az 6 karakter olmali'})
    
    password:string;
}