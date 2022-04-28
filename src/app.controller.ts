import { Controller, Get, Post,Res,Param, Body,UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from './app.service';
import { FileDto } from './dto';
import { createReadStream } from 'fs';
import { join } from 'path';


@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('files')
  getFile() {
    return this.appService.getFile();
  }
  @Post('add/file')
  @UseInterceptors(FileInterceptor('files'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: FileDto) { 
        console.log(file)
        // return this.appService.addFile(dto, file);
    }

}
