import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { renderController } from './filerender/rend.controller';
import { renderService } from './filerender/rend.service';
import { CancatModule } from './cancat/cancat.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './strategy';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({isGlobal: true}), CancatModule, AuthModule,LoggerModule],
  controllers: [AppController,renderController],
  providers: [AppService,renderService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/files','/cancat/add');
  }
}