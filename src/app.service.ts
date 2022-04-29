import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService){}
  async getFile() { 
    let files = await this.prisma.files.findMany();
    return files
  }
}
