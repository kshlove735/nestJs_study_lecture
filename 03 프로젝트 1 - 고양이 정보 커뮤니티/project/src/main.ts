import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { title } from 'process';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // schema에서 Class validation 쓰기위해서
  app.useGlobalFilters(new HttpExceptionFilter()); //nest에서 제공하는 오류 filter-> 전역 설정
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('cat')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    // 개발중 : true, 배포: 특정 url
    origin: true,
    credentials: true,
  });
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
