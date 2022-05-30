import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { appendFileSync } from 'fs'
import { MyLogger } from 'src/logger/create-log';
import { PostNotFoundException } from './exprestion';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService,
              private logger: MyLogger){}
  async getFile(req) { 
    try {
      let files = await this.prisma.files.findMany({
        where:{
          userId: req.user.sub
        }
      });

      if(!files.length){
        throw new PostNotFoundException(req.user.sub) 
      }
      this.logger.log(req,'home page',files[0])
      return files
    } catch (error) {
      this.logger.error(req,error)
      return error
    }
  }
}
