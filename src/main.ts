import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
    .setTitle('BankProject API')
    .setDescription(
      'The Banking API is designed to provide a set of endpoints for managing various banking operations. This API allows clients to interact with their bank accounts, perform financial transactions, and retrieve account information. It is a secure and reliable solution for integrating banking services into your applications.'
    )
    .setVersion('1.0')
    .addTag('auth')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  app.enableCors({ origin: ['http://localhost:5173'] })

  await app.listen(3000)
}
bootstrap()
