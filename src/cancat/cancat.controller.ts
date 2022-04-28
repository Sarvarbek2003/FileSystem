import { Controller, Post, UploadedFiles,ForbiddenException, UseInterceptors } from '@nestjs/common';
import { CancatService } from './cancat.service';
import { FilesInterceptor } from "@nestjs/platform-express";
import { extname } from 'path'

@Controller('/cancat')
export class CancatController {
    constructor(private cancatService: CancatService){}
    @Post('add')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File> ) {
        if(!files.length)  throw new  ForbiddenException('File is required')
        if( 
            (extname(files[0]?.originalname) == '.xlsx' && 
            extname(files[1]?.originalname) == '.xlsx') ||
            (extname(files[0]?.originalname) == '.xls' && 
            extname(files[1]?.originalname) == '.xls')
        ){
            return this.cancatService.xls(files)
        } 
        // else if( 
        //     (extname(files[0]?.originalname) == '.docx' && 
        //     extname(files[1]?.originalname) == '.docx') ||
        //     (extname(files[0]?.originalname) == '.doc' && 
        //     extname(files[1]?.originalname) == '.doc')
        // ){
        //     return this.cancatService.doc(files)
        // } 
        else if (
            (extname(files[0]?.originalname) == '.pdf' && 
            extname(files[1]?.originalname) == '.pdf')
        ){
            return this.cancatService.pdf(files)
        } else {
            throw new  ForbiddenException('Fayl faqat .xlsx yoki .pdf formatlarda bo`lishi kerak')
        } 
    }
}



