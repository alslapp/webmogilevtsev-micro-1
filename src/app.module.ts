import { SharedModule } from '@lib/shared';
import { Module } from '@nestjs/common';
import { ProvidersModule } from 'lib/providers';

@Module({
  imports: [
    SharedModule,
    ProvidersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
