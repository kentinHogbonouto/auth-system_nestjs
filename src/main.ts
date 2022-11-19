import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './environments/environments';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors;
  app.enableShutdownHooks;
  app.use(helmet());

  /**
   * TO DO review compression package later
   */

  // const options: SwaggerDocumentOptions = {
  //   operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  // };
  // const config = new DocumentBuilder()
  //   .setTitle('Authentication system Server')
  //   .setDescription('Showcare Sales server API Documentation')
  //   .setVersion('1.0')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config, options);
  // SwaggerModule.setup('/docs', app, document);

  const port = environments.port;

  await app.listen(port);
}
bootstrap();
