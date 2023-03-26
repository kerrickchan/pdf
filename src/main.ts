import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenApiProvider } from './openapi/openapi.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  OpenApiProvider.setup(app, 'swagger');

  await app.listen(3000);
}
bootstrap();
