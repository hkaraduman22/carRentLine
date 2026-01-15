import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  // 1. Yeni Mesaj Oluştur (Kullanıcı)
  async create(userId: number, createMessageDto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        carId: createMessageDto.carId,
        userId: userId,
      },
    });
  }

  // 2. Tüm Mesajları Getir (Admin için)
  async findAll() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true, // Mesajı atan kullanıcıyı gör
        car: true,  // Hangi araca mesaj atıldığını gör
      },
    });
  }

  // 3. Sadece Giriş Yapan Kullanıcının Mesajlarını Getir
  async findMyMessages(userId: number) {
    return this.prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        car: true, // Frontend'de araç bilgisini göstermek için gerekli
      },
    });
  }

  // 4. Mesaja Cevap Ver (Admin)
  async reply(id: number, replyContent: string) {
    return this.prisma.message.update({
      where: { id },
      data: { reply: replyContent },
    });
  }

  // 5. Mesaj Sil (Opsiyonel)
  async remove(id: number) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}