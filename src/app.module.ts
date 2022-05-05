import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { renderController } from './filerender/rend.controller';
import { renderService } from './filerender/rend.service';
import { CancatModule } from './cancat/cancat.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({isGlobal: true}), CancatModule, AuthModule],
  controllers: [AppController,renderController],
  providers: [AppService,renderService],
})
export class AppModule {}
