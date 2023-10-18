import { Module } from '@nestjs/common';
import { ProvidersModule } from 'lib/providers';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ProvidersModule,
  ],
})
export class AppModule { }
