import { Injectable,ForbiddenException } from '@nestjs/common';
import xlsx from 'node-xlsx';
import { jsonToXlsx } from 'json-and-xlsx';
import { writeFileSync } from 'fs';
import { join, extname} from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { PDFDocument } from 'pdf-lib'
import { FileDto } from 'src/cancat/dto';
import { appendFileSync, existsSync, mkdirSync} from "fs";

let d = new Date()
let time = new Date(d).toLocaleString('uz-UZ')

@Injectable()
export class CancatService {
    constructor(private prisma: PrismaService){}
    async xls(files,dto:FileDto,req){  
        let d = new Date()
        let time = new Date(d).toLocaleString('uz-UZ')
        let date = new Date(d).toLocaleDateString('uz-UZ');
        date = date.split('/').join('-')
        try {
            let filename = (new Date().getTime())+extname(files[0].originalname)
            let array = files.map(el => xlsx.parse(el.buffer)[0]?.data).flat();

            if(!existsSync('files/xlsx/'+date,)){
                mkdirSync('files/xlsx/'+date);
            }

            const output = jsonToXlsx.readAndGetBuffer(array);
            await this.prisma.files.create({
                data: {
                    userId: req.user.sub,
                    filename: dto.fileName+extname(files[0].originalname),
                    filepath: '/xlsx/'+date+'/'+filename,
                    filesize: Buffer.byteLength(output),
                    fileinfo: `Row ${array.length}`
                }
            });
            
            writeFileSync(join(process.cwd(), 'files','xlsx',date,filename),output)

            if(!existsSync('logs/'+req.user['username'])){
                mkdirSync('logs/'+req.user['username']);
            }
            appendFileSync('logs/'+req.user['username']+'/log.txt', '\n'+time+' '+req.route.path+' '+req.method+' '+JSON.stringify(dto)+' xlsx cancat ---> ' + {status: 201, message: 'Created'})
            return {status: 201, message: 'Created'}
        } catch (error) {
            if(!existsSync('logs/'+req.user['username'])){
                mkdirSync('logs/'+req.user['username']);
            }
            appendFileSync('logs/'+req.user['username']+'/error.txt', '\n'+time+' '+req.route.path+' '+req.method+' '+JSON.stringify(dto)+' '+error.message)
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
            let d = new Date()
            let time = new Date(d).toLocaleString('uz-UZ');
            let date = new Date(d).toLocaleDateString('uz-UZ');
            date = date.split('/').join('-')
            const buf = await mergedPdf.save();        
            await this.prisma.files.create({
                data: {
                    userId: req.user.sub,
                    filename: dto.fileName+extname(files[0].originalname),
                    filepath: '/pdf/'+date+'/'+filename,
                    filesize: Buffer.byteLength(buf),
                    fileinfo: `Page ${pages}`
                }
            });
           
            if(!existsSync('logs/'+req.user['username'])){
                mkdirSync('logs/'+req.user['username']);
            }
            appendFileSync('logs/'+req.user['username']+'/log.txt', '\n'+time+' '+req.route.path+' '+req.method+' '+JSON.stringify(dto)+' '+' pdf cancat');
            if(!existsSync('files/pdf/'+date,)){
                mkdirSync('files/pdf/'+date);
            }
            writeFileSync(join(process.cwd(), 'files','pdf',date,filename),buf);

            return {status: 201, message: 'Created'}
        } catch(error){
            if(!existsSync('logs/'+req.user['username'])){
                mkdirSync('logs/'+req.user['username']);
            }
            appendFileSync('logs/'+req.user['username']+'/error.txt', '\n'+time+' '+req.route.path+' '+req.method+' '+JSON.stringify(dto)+' '+error.message)
            throw new  ForbiddenException('Error')
        }
    }
}
