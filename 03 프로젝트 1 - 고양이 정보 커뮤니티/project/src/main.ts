import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); //nest에서 제공하는 오류 filter-> 전역 설정
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
