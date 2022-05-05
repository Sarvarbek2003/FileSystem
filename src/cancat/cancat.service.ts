import { Injectable,ForbiddenException } from '@nestjs/common';
import xlsx from 'node-xlsx';
import { jsonToXlsx } from 'json-and-xlsx';
import { writeFileSync } from 'fs';
import { join, extname} from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { PDFDocument } from 'pdf-lib'
import { FileDto } from 'src/dto';
import { appendFileSync } from "fs";
let d = new Date()
let time = new Date(d).toLocaleString('uz-UZ')

@Injectable()
export class CancatService {
    constructor(private prisma: PrismaService){}
    async xls(files,dto:FileDto,req){  
        try {
            let filename = (new Date().getTime())+extname(files[0].originalname)
            let array = files.map(el => xlsx.parse(el.buffer)[0]?.data).flat();

            const output = jsonToXlsx.readAndGetBuffer(array);
            writeFileSync(join(process.cwd(), 'files','xlsx',filename),output)

            await this.prisma.files.create({
                data: {
                    userId: req.user.userId,
                    filename: dto.fileName+extname(files[0].originalname),
                    filepath: '/xlsx/'+filename,
                    filesize: Buffer.byteLength(output),
                    fileinfo: `Row ${array.length}`
                }
            });

        } catch (error) {
            throw new  ForbiddenException('Error')
        }
    }
    async doc(files){  
        /// ......
    }
    async pdf(files,dto:FileDto, req){  
        try{
            let filename = (new Date().getTime())+extname(files[0].originalname)
            
            let pdfsToMerge = files.map(el => el.buffer)
            const mergedPdf = await PDFDocument.create(); 
            let pages = 0
            for (const pdfBytes of pdfsToMerge) { 
                const pdf = await PDFDocument.load(pdfBytes); 
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => {
                    pages++
                    mergedPdf.addPage(page); 
                }); 
            } 

            const buf = await mergedPdf.save();        
            await this.prisma.files.create({
                data: {
                    userId: req.users.userId,
                    filename: dto.fileName+extname(files[0].originalname),
                    filepath: '/pdf/'+filename,
                    filesize: Buffer.byteLength(buf),
                    fileinfo: `Page ${pages}`
                }
            });

            writeFileSync(join(process.cwd(), 'files','pdf',filename),buf)
        } catch(error){
            throw new  ForbiddenException('Error')
        }
    }
}
