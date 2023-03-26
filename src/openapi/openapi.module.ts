import { Module } from '@nestjs/common';
import { OpenApiProvider } from './openapi.provider';

@Module({
  providers: [OpenApiProvider],
})
export class OpenApiModule {}
