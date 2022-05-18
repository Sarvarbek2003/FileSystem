import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { JwtStrategy } from "src/strategy";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
