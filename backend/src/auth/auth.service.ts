// src/auth/auth.service.ts
import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"; // Yolu kontrol et
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register(data: RegisterDto) {
        // 1. Kontrol
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (userExists) {
            throw new BadRequestException('Bu e-posta zaten kayitli');
        }

        // 2. Şifreleme
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // 3. Kayıt
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: hashedPassword,
                role: 'user'
            }
        });

        // 4. Sonuç (Burası parantezin içinde olmalı!)
        const { password, ...result } = user;
        return result;
    } 
}