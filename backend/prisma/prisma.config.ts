 // backend/prisma.config.ts

 //prisma 7 den sonra bu dosya olmadan schema çalışmıyor
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma', // Şema dosyasının yeri
  datasource: {
    // Veritabanı bağlantı adresi artık burada!
    url: env('DATABASE_URL'), 
  },
});