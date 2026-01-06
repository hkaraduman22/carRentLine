 import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// CreateUserDto'daki her şeyi alır ama hepsini "opsiyonel" yapar.
// Yani güncelleme yaparken sadece ismi değiştirip şifreyi boş bırakabilirsin.
export class UpdateUserDto extends PartialType(CreateUserDto) {}