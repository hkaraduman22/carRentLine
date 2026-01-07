import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto'; // Eğer hata verirse bu satırı silebilirsin, şu an create kullanmıyoruz.
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // --- EKSİK OLAN FONKSİYON BUYDU ---
  async findAll() {
    return this.prisma.user.findMany({
      // Güvenlik: Kullanıcıların şifrelerini (password) çekmiyoruz!
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Email ile kullanıcı bulma (Login için gerekli)
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }


 async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto, 
    });
  }

async remove(id: number) {
  return this.prisma.user.delete({
    where: { id },
  });
}

  
}