import { Injectable, UnauthorizedException ,NestMiddleware} from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import NodeRSA from 'encrypt-rsa';
import { readFileSync } from "fs";
import { join } from "path";
const nodeRSA = new NodeRSA();


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
        let encryptedText = req.rawHeaders[req.rawHeaders.indexOf('Authorization') + 1]
        let privateKey = readFileSync(join(process.cwd(), 'privateKey.key'), 'utf-8').toString()
        const decryptedText = nodeRSA.decryptStringWithRsaPrivateKey({ 
            text: encryptedText, 
            privateKey
        });
        req.user = JSON.parse(decryptedText)
        next()
    } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Token invalid')
    }
  }
}

