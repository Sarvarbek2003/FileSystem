import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { appendFileSync } from 'fs'
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService){}
  async getFile(req) { 
    let d = new Date()
    let time = new Date(d).toLocaleString('uz-UZ')
    try {
      let files = await this.prisma.files.findMany({
        where:{
          userId: req.user.sub
        }
      }); 
      return files
    } catch (error) {
      appendFileSync('logs/'+req.user['username']+'/error.txt', '\n'+time+' '+req.route.path+' '+req.method+''+error.message)
    }
  }
}
