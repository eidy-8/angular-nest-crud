import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'debug', 'fatal', 'log', 'verbose', 'warn']
  });

  app.useLogger(new Logger());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle(process.env.DOCS_TITLE ?? 'Documentação API')
  .setDescription(process.env.DOCS_DESCRIPTION ?? 'Documentação API')
  .setVersion(process.env.DOCS_VERSION ?? '1.0.0')
  .setContact(process.env.DOCS_CONTACT_NAME ?? " - ", process.env.DOCS_CONTACT_URL ?? " - ", process.env.DOCS_CONTACT_MAIL ?? " - ")
  .setContact(process.env.DOCS_CONTACT_NAME ?? " - ", process.env.DOCS_CONTACT_URL ?? " - ", process.env.DOCS_CONTACT_MAIL ?? " - ")
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'JWT',
  ).build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacao', app, documentFactory);
  
  app.enableCors({
    origin: process.env.CORS ?? '*',
    methods: 'GET,POST,PUT,DELETE',
  });

  app.use(bodyParser.json({ limit: 1 * 1024 * 1024 * 1024 }));
  app.use(bodyParser.urlencoded({ limit: 1 * 1024 * 1024 * 1024, extended: true }));  
  app.use(cookieParser());
  app.use(compression());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
