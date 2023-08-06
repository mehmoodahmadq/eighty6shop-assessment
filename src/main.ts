import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Eighty6Shop API')
    .setDescription('This is a test API built for Eighty6Shop')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        description: `[just text field] Please provide token`,
        name: 'Authorization',
        type: 'http',
        in: 'Header',
      },
      'atoken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
