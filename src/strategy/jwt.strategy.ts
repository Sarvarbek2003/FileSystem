import { Injectable, UnauthorizedException ,NestMiddleware} from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import NodeRSA from 'encrypt-rsa';
import { readFileSync } from "fs";
import { join } from "path";
import { PrismaService } from "src/prisma/prisma.service";
const nodeRSA = new NodeRSA();


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService){}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
        let encryptedText = req.rawHeaders[req.rawHeaders.indexOf('Authorization') + 1]?.split('Bearer')?.join('')
        let privateKey = readFileSync(join(process.cwd(), 'privateKey.key'), 'utf-8').toString()
        const decryptedText = nodeRSA.decryptStringWithRsaPrivateKey({ 
            text: encryptedText, 
            privateKey
        });
        let user = await this.prismaService.users.findMany({ where:{userId: JSON.parse(decryptedText).sub}})
        if(!user) throw new UnauthorizedException('Token invalid')
        req.user = JSON.parse(decryptedText)
        next()
    } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Token invalid')
    }
  }
}

