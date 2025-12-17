import { Controller, UseGuards,Get,Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @UseGuards(AuthGuard('jwt')) //KİLİTLEME (TOKENİ OLAN ULAŞABİLSİN)
  @Get('profile')
  getProfile(@Request() req) {
    // Sadece token'ı geçerli olanlar buraya girebilir.
    // req.user bilgisini de JwtStrategy'den (validate fonksiyonundan) alıyoruz.
    return req.user;
  }

}
