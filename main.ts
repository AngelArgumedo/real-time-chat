import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilita CORS para permitir conexiones desde otros dominios/puertos
  app.enableCors({
    origin: '*', // Permite cualquier origen (puedes restringirlo a tu puerto)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server started on port ${process.env.PORT} or 3000`);
}
bootstrap();
