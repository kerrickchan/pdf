import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { OpenApiProvider } from './openapi/openapi.provider';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useBodyParser('text');
  app.useStaticAssets('public', { prefix: '/public/' });

  const openapiUrl = 'swagger';
  OpenApiProvider.setup(app, openapiUrl);

  await app.listen(3000);

  console.info(`Application is running on: ${await app.getUrl()}`);
  console.info(`Folder is serving on: ${await app.getUrl()}/public/html`);
  console.info(`OpenAPI is running on: ${await app.getUrl()}/${openapiUrl}`);
}
bootstrap();
