// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path'; // Import join from path
import { NestExpressApplication } from '@nestjs/platform-express'; // Add this import
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Add <NestExpressApplication>
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  const config = new DocumentBuilder()
    .setTitle('Clinic Management API')
    .setDescription(
      'API for managing clinic operations including patients, visits, and more.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(7009);
}
bootstrap();
