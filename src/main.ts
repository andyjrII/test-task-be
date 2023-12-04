import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: FRONTEND_BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    preflightContinue: false,
    maxAge: 86400,
  });
  app.setGlobalPrefix('api');
  await app.listen(3300);
}
bootstrap();
