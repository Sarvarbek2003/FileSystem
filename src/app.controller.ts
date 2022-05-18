import { Controller,UseGuards,Next, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from "@nestjs/swagger";
import { NextFunction, Request } from 'express';
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Get('files')
  @ApiBearerAuth('access_token')
  getFile(@Req() req: Request) {
    return this.appService.getFile(req);
  }
}
