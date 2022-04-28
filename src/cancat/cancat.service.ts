import { Injectable,ForbiddenException } from '@nestjs/common';
import xlsx from 'node-xlsx';
import { jsonToXlsx } from 'json-and-xlsx';
import { writeFileSync,createWriteStream, readFileSync} from 'fs';
import { join, extname} from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { PDFDocument } from 'pdf-lib'

@Injectable()
export class CancatService {
    constructor(private prisma: PrismaService){}
    async xls(files){  
        try {
            let filename = (new Date().getTime())+extname(files[0].originalname)

            const data1 = xlsx.parse(files[0].buffer);
            const data2 = xlsx.parse(files[1].buffer)

            let data = [...data1[0]?.data, ...data2[0]?.data]
            const output = jsonToXlsx.readAndGetBuffer(data);

            await this.prisma.files.create({
                data: {
                fileName: files[0].originalname,
                filePath: '/'+filename,
                fileSize: files[0].size + files[1].size,
                title: `Column ${data.length}`
                }
            });

            writeFileSync(join(process.cwd(), 'files',filename),output)
        } catch (error) {
            throw new  ForbiddenException('Error')
        }
    }
    async doc(files){  
        /// ......
    }
    async pdf(files){  
        try{
            let filename = (new Date().getTime())+extname(files[0].originalname)
            let pdfsToMerge = [files[0].buffer, files[1].buffer]
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
                fileName: files[0].originalname,
                filePath: '/'+filename,
                fileSize: files[0].size + files[1].size,
                title: `Page ${pages}`
                }
            });

            writeFileSync(join(process.cwd(), 'files',filename),buf)
        } catch(error){
            throw new  ForbiddenException('Error')
        }
    }
}
