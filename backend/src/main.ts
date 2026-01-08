import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  //UYGULAMAYI BAŞLATMA
  const app = await NestFactory.create(AppModule);
  //dtoda yazdıgım sifre kontrolü
  //ValidationPipe ile dtodaki kontrol
  
  // Bu satır sayesinde Frontend (port 5173) Backend'e (port 3001) erişebilir.
  app.enableCors();
  
  //TÜR dönüşümü jsonda her şeyi string olarak alır
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    //DTO DA TANIMLI DEGİLSE SİL
    whitelist:true,
    //DTO DA OLMAYAN Requesti kabul etme
    //Ayrıyeten bunun yazılması gerektiğini bilmiyordum validationpipe direkt kontrol ediyor sanıyordum
    forbidNonWhitelisted:true,
    stopAtFirstError: false,//ilk hatada durmasın
  }))
  
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
