import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //dtoda yazdıgım sifre kontrolü
  //ValidationPipe ile dtodaki kontrol
  
  // Bu satır sayesinde Frontend (port 5173) Backend'e (port 3000) erişebilir.
  app.enableCors();
  
  //TÜR dönüşümü jsonda her şeyi string olarak alır
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    //DTO DA TANIMLI DEGİLSE SİL
    whitelist:true,
    //DTO DA OLMAYAN Requesti kabul etme
    //Ayrıyeten bunun yazılması gerektiğini bilmiyordum validationpipe direkt kontrol ediyor sanıyordum
    forbidNonWhitelisted:true,
  }))
  // 2. SWAGGER AYARLARI (BURAYI EKLE)
  const config = new DocumentBuilder()
    .setTitle('Araç Kiralama API') // Başlık
    .setDescription('Rent A Car projesi için API dokümantasyonu') // Açıklama
    .setVersion('1.0') // Versiyon
    .addBearerAuth() // Token kilit simgesini ekle (Auth işlemleri için)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'localhost:3000/api' adresinde çalışsın
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
