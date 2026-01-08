import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // --- KAYIT OLMA  
  async register(data: RegisterDto) {

    
  const userExists=await this.usersService.findByEmail(data.email)

    if (userExists) {
      throw new BadRequestException('Bu e-posta zaten kayitli');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: hashedPassword,
        role: 'user',
      },
    });

    const { password, ...result } = user;
    return result;
  }

  

  // 1. Kullanıcı Doğrulama
  //async

  async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if(!user){
      throw new  UnauthorizedException("Kullanici bulunamadi")
    }

    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Sifre hatali.');
    }

    const { password, ...result } = user;
    return result;
  }

  // 2. Token Üretme
  // --- GİRİŞ YAPMA (Düzeltilen Kısım) ---
  async login(loginDto: LoginDto) {
    
    
    // Önce kullanıcıyı ve şifresini doğrula. Eğer yanlışsa validateUser hata fırlatır ve kod burada durur.
    const user = await this.validateUser(loginDto);

    // Eğer buraya geldiyse şifre doğrudur. Token üret.
    const payload = { email: user.email, sub: user.id, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload), // Frontend'e 'accessToken' olarak gönderiyoruz
      user: user,
    };
  }
}
