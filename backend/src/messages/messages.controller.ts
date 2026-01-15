import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // POST /messages -> Yeni mesaj at
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    // req.user.userId, JWT stratejisinden gelir
    return this.messagesService.create(req.user.userId, createMessageDto);
  }

  // GET /messages -> Tüm mesajları gör (Admin)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    // Gerçek bir uygulamada burada Admin rol kontrolü yapılmalı
    return this.messagesService.findAll();
  }

  // GET /messages/my -> Kendi mesajlarımı gör
  @UseGuards(AuthGuard('jwt'))
  @Get('my')
  findMyMessages(@Request() req) {
    return this.messagesService.findMyMessages(req.user.userId);
  }

  // PUT /messages/:id/reply -> Mesaja cevap ver (Admin)
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/reply')
  reply(@Param('id') id: string, @Body('reply') reply: string) {
    return this.messagesService.reply(+id, reply);
  }

  // DELETE /messages/:id -> Mesaj sil
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}