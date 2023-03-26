import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenApiModule } from './openapi/openapi.module';
import { PdfModule } from './pdf/pdf.module';
import { TemplateModule } from './template/template.module';

@Module({
  imports: [OpenApiModule, TemplateModule, PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
