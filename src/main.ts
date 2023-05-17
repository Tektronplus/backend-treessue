import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'https://backend-treessue.vercel.app',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
