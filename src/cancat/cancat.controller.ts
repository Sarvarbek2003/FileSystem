import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CancatService } from './cancat.service';
import { FilesInterceptor,AnyFilesInterceptor,FileFieldsInterceptor} from "@nestjs/platform-express";


@Controller('/cancat')
export class CancatController {
    constructor(private cancatService: CancatService){}
    @Post('add')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        return this.cancatService.cancat(files)
    }

}
