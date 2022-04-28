import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from 'path';
import { AppModule } from './app.module';
import { renderFile } from 'ejs'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.engine('html', renderFile)
  app.setBaseViewsDir(join(__dirname, '../public'))
  app.useStaticAssets(join(__dirname, '../public'), {
    index: false,
    redirect: false
  })
  app.useStaticAssets(join(__dirname, '../files'), {
    index: false,
    redirect: false
  })
  await app.listen(3000);
}
bootstrap();
