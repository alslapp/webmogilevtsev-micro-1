import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';
import { ProvidersModule } from 'lib/providers';
import { ApiModule } from './api';

@Module({
  imports: [
    SharedModule,
    ProvidersModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
