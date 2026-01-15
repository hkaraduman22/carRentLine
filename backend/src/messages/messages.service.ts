import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  // Mesaj oluştur
  async create(userId: number, createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        carId: createMessageDto.carId,
        userId: userId,
      },
    });
  }

  // ✅ KRİTİK DÜZELTME: include eklendi
  async findAll() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true, // Mesajı kimin attığını getir
        car: true,  // Hangi araca atıldığını getir
      },
    });
  }

  // Kullanıcının kendi mesajları
  async findMyMessages(userId: number) {
    return this.prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { 
        car: true, // Frontend'de araba resmi göstermek için lazım
        user: true 
      },
    });
  }

  // Cevap ver
  async reply(id: number, replyContent: string) {
    return this.prisma.message.update({
      where: { id },
      data: { reply: replyContent },
    });
  }

  // Sil
  async remove(id: number) {
    return this.prisma.message.delete({ where: { id } });
  }
}