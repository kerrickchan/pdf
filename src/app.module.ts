import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HtmlModule } from './html/html.module';
import { OpenApiModule } from './openapi/openapi.module';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [OpenApiModule, HtmlModule, ConfigModule.forRoot(), PdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
