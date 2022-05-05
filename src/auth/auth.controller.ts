import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import {existsSync, mkdirSync} from 'fs';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('login')
    login(@Body() dto: AuthDto, @Req() req: Request){
        return this.authService.login(dto, req)
    }

    @Post('signup')
    signup(@Body() dto: AuthDto, @Req() req: Request){
        return this.authService.signup(dto, req)
    }
}
