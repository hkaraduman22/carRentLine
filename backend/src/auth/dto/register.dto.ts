
import { IsString,IsEmail,MinLength, IsStrongPassword, minLength} from "class-validator";

export class RegisterDto{
@IsEmail({},{message:'Lutfen gecerli bir e-posta giriniz!'})
email:string;

@IsString()
@MinLength(6,{message:'Sifreniz en az 6 karakterden olusmalidir!'})

//sifre olusturma kontrolü

@IsStrongPassword({
minLength:6,
minLowercase:1,
minUppercase:1,
minNumbers:1,
minSymbols:1

},{
   message:'Sifreniz cok zayif.En az 6 harf uzunlugunda olmali;en az 1 buyuk 1 kucuk harf ve en az 1 sayi ve 1 sembol icermelidir'
}
)

password:string;

//ad ve soyad string olmalı rakam veya özel karakter içeremez

@IsString()
name:string;

@IsString()
surname:string;

}