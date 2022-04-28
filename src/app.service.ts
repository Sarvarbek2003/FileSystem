import { Injectable } from '@nestjs/common';
import { FileDto } from './dto';
import { PrismaService } from './prisma/prisma.service';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService){}
  async getFile() { 
    let files = await this.prisma.files.findMany();
    return files
  }

  async addFile(dto: FileDto,file) {
    let filename = (new Date()).getTime()+file.originalname.replace(/\s/g, '')
    await this.prisma.files.create({
      data: {
        fileName: dto.fileName,
        filePath: '/'+filename,
        fileSize: file.size,
        title: dto.title
      }
    });

    writeFileSync(join(process.cwd(),'files',filename),file.buffer) 
  }
}
