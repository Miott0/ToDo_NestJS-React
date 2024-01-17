import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './error/http-exception.filter';
import { ErrorsInterceptor } from './error/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,);
  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ErrorsInterceptor())
  
  await app.listen(8000);
}
bootstrap();
