import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  await app.listen(process.env.PORT);
  console.log(process.env.PORT);
  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
