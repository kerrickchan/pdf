import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from '../../package.json';

export class OpenApiProvider {
  static setup(app: INestApplication, path = 'openapi') {
    const config = new DocumentBuilder()
      .setTitle(name)
      .setDescription(description)
      .setVersion(version)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(path, app, document);
  }
}
