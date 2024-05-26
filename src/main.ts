import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ThrottlerGuard } from '@nestjs/throttler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(5000);
}
bootstrap();
