import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HtmlModule } from './html/html.module';
import { OpenApiModule } from './openapi/openapi.module';

@Module({
  imports: [
    OpenApiModule,
    HtmlModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public/html'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
