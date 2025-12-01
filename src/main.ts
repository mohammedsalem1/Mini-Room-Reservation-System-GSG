import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app:INestApplication = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Room booking System')
    .setDescription('The best documentation room booking System')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt')
    .build()
  const document = SwaggerModule.createDocument(app , config)
  SwaggerModule.setup("api", app, document );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
