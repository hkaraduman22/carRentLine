 import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { IsOptional,IsString } from 'class-validator';

// CreateUserDto'daki her şeyi alır ama hepsini "opsiyonel" yapar.
// Yani güncelleme yaparken sadece ismi değiştirip şifreyi boş bırakabilirsin.
export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString()
    role?: string;
}