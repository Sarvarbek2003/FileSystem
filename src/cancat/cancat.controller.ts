import { Controller, Post, UploadedFiles,ForbiddenException, Body, UseInterceptors } from '@nestjs/common';
import { CancatService } from './cancat.service';
import { FilesInterceptor } from "@nestjs/platform-express";
import { extname } from 'path'
import { FileDto } from 'src/dto';

@Controller('/cancat')
export class CancatController {
    constructor(private cancatService: CancatService){}
    @Post('add')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: FileDto ) {
        if(!files.length)  throw new  ForbiddenException('File is required')
        let xlsx = files.map(el => extname(el.originalname) == '.xlsx' || extname(el.originalname) == '.xls')
        let docx = files.map(el => extname(el.originalname) == '.docx' || extname(el.originalname) == '.doc')
        let pdf = files.map(el => extname(el.originalname) == '.pdf')

        if(!xlsx.includes(false)){
            return this.cancatService.xls(files,dto)
        } 
        // else if(!docx.includes(false)){
        //     return this.cancatService.doc(files)
        // } 
        else if (!pdf.includes(false)){
            return this.cancatService.pdf(files,dto)
        } else {
            throw new  ForbiddenException('Fayl faqat .xlsx yoki .pdf formatlarda bo`lishi kerak')
        } 
    }
}



