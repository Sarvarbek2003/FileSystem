import { Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from "argon2"; 
import { appendFileSync,existsSync, mkdirSync } from "fs";
import { join } from 'path'


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
        ){}
        async signup(dto: AuthDto, req){
            try {
                const  hash = await argon.hash(dto.password.toString())
            
                const user = await this.prisma.users.create({
                data:{
                    email: dto.email.toString(),
                    username: dto.username.toString(),
                    password: hash,
                    logpath: 'logs/'+dto.username
                }
            })
            let d = new Date()
            let time = new Date(d).toLocaleString('uz-UZ')
            let data  = `${time} ${req.route.path} ${req.headers['user-agent']}`
            mkdirSync('logs/'+dto.username);
            appendFileSync('logs/'+dto.username+'/log.txt', data, 'utf-8');
        
            return this.signToken(user.userId, user.username)
        } catch (error) {
            console.log(error.message)
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == 'P2002'){
                    throw new ForbiddenException('The user already exists')
                }
            }
            throw new UnauthorizedException("Registration error")
        }
    }
    async login(dto, req){
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    username: dto.username
                }
            });

            if(!user) throw new ForbiddenException("User not found");

            const password = await argon.verify(user.password, dto.password);
            let d = new Date()
            let time = new Date(d).toLocaleString('uz-UZ')

            if(!password) {
                if(!existsSync("logs/"+user.username)){
                    mkdirSync("logs/"+user.username);
                }
                appendFileSync('logs/'+user.username+'/error.txt', '\n'+time+' '+ req.route.path+' Wrong password '+req.headers['user-agent'])
                throw new UnauthorizedException("Wrong password");
            }
            appendFileSync('logs/'+user.username+'/log.txt', '\n'+time+' '+ req.route.path+' '+req.headers['user-agent'])
            return  this.signToken(user.userId, user.username)
       } catch (error) {
            throw new UnauthorizedException("Error");
       }
    }
    
    async signToken (userId: number, username: string): Promise<{ access_token: string, id: number }> {
        const payload = {
            sub: userId,
            username
        }

        const secret = this.config.get('SEKRET_KEY')

        const token = await this.jwt.signAsync(payload,{
            expiresIn: '15h',
            secret: secret
        })

        return { 
            id: userId,
            access_token: token,
        }
    }
}
