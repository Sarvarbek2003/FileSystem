import { Controller, Post,Req,Next, UseGuards, UploadedFiles,ForbiddenException, Body, UseInterceptors } from '@nestjs/common';
import { CancatService } from './cancat.service';
import { AuthGuard } from "@nestjs/passport";
import { FilesInterceptor } from "@nestjs/platform-express";
import { extname } from 'path'
import { FileDto } from 'src/cancat/dto';
import { NextFunction, Request } from 'express';
import { appendFileSync } from 'fs';
import { ApiBearerAuth, ApiConsumes, ApiBody } from "@nestjs/swagger";

@Controller('/cancat')
export class CancatController {
    constructor(private cancatService: CancatService){}
    @Post('add')
    @ApiBearerAuth('access_token')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ 
        schema: {
        type: 'object',
        properties: {
            filename: {type:'String' },
            file: {
              type: 'string',
              format: 'binary',
            },
          },
      }, })
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: FileDto, @Req() req: Request ) {
        if(!files.length) {
            let d = new Date()
            let time = new Date(d).toLocaleString('uz-UZ')
            appendFileSync('logs/'+req.user['username']+'/error.txt', '\n'+time+' '+req.route.path+' '+req.method+' '+JSON.stringify(dto)+' File is required')
            throw new  ForbiddenException('File is required')
        }
        let xlsx = files.map(el => extname(el.originalname) == '.xlsx' || extname(el.originalname) == '.xls')
        let docx = files.map(el => extname(el.originalname) == '.docx' || extname(el.originalname) == '.doc')
        let pdf = files.map(el => extname(el.originalname) == '.pdf')
        if(!xlsx.includes(false)){
            return this.cancatService.xls(files,dto, req)
        } 
        // else if(!docx.includes(false)){
        //     return this.cancatService.doc(files)
        // } 
        else if (!pdf.includes(false)){
            return this.cancatService.pdf(files,dto, req)
        } else {
            let d = new Date()
            let time = new Date(d).toLocaleString('uz-UZ')
            appendFileSync('logs/'+req.user['username']+'/error.txt', '\n'+time+' '+req.route.path+' '+req.method+' '+JSON.stringify(dto)+' Fayl faqat .xlsx yoki .pdf formatlarda bo`lishi kerak')
            throw new  ForbiddenException('Fayl faqat .xlsx yoki .pdf formatlarda bo`lishi kerak')
        } 
    }
}



