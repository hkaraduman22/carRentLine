import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
 
  const app = await NestFactory.create(AppModule);
   
   
  app.enableCors();
   
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
     
    whitelist:true,
     
    forbidNonWhitelisted:true,
    stopAtFirstError: false, 
  }))
  
  
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
