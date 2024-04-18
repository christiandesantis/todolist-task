import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const options: any = {};

  if (
    configService.get<string>('env') === 'production' &&
    fs.existsSync(configService.get<string>('ssl.key')) &&
    fs.existsSync(configService.get<string>('ssl.cert'))
  ) {
    options.httpsOptions = {
      cert: fs.readFileSync(configService.get<string>('ssl.cert')),
      key: fs.readFileSync(configService.get<string>('ssl.key')),
    };
  }

  const app = await NestFactory.create(AppModule, options);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    origin: configService.get<string>('cors.origin').split(','),
    credentials: true,
  });

  await app.listen(
    configService.get<string>('env') === 'production' &&
      fs.existsSync(configService.get<string>('ssl.key')) &&
      fs.existsSync(configService.get<string>('ssl.cert'))
      ? configService.get<number>('port') ?? 8443
      : configService.get<number>('port') ?? 3000,
  );
}
bootstrap();
