import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OpenApiProvider } from './openapi/openapi.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const openapiUrl = 'swagger';
  OpenApiProvider.setup(app, openapiUrl);

  await app.listen(3000);

  console.info(`Application is running on: ${await app.getUrl()}`);
  console.info(`Application is running on: ${await app.getUrl()}/html`);
  console.info(`OpenAPI is running on: ${await app.getUrl()}/${openapiUrl}`);
}
bootstrap();
