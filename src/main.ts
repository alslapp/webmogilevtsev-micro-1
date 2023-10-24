import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const httpPort = configService.get<number>('HTTP_PORT', 3000);

  const config = new DocumentBuilder()
    .setTitle('Posts')
    .setDescription('CRUD API by posrs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'api-doc';
  SwaggerModule.setup(swaggerPath, app, document);

  const globalPrefix = ''; // api

  app.setGlobalPrefix(globalPrefix);
  await app.listen(httpPort);
  Logger.log(`🚀 Api is running on: http://localhost:${httpPort}/${globalPrefix}`, 'Main');
  Logger.log(`Swagger documentation on http://localhost:${httpPort}/${swaggerPath}`, 'Main');
}
bootstrap();
