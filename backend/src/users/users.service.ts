import { Injectable } from '@nestjs/common';

//veritabanindan kullaniciyi cekmek icin
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService{

    constructor(private prisma:PrismaService){}

    //Email adresine gore veritabanindan kullaniciyi ceker
    
    async findByEmail(email:string){
        return this.prisma.user.findUnique({
           
            where:{email},
            
        });
    }
}