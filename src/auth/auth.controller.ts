import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';
import { ApiBody, ApiCreatedResponse, ApiConsumes, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('login')
    @ApiOkResponse({description: "User login"})
    @ApiUnauthorizedResponse({description: "Wrong username or password"})
    @ApiBody({ type: LoginDto })
    login(@Body() dto, @Req() req: Request){
        return this.authService.login(dto, req)
    }

    @Post('signup')
    @ApiCreatedResponse({description: "User registration"})
    @ApiUnauthorizedResponse({description: "Registration error"})
    @ApiBody({ type: AuthDto })
    signup(@Body() dto: AuthDto, @Req() req: Request){
        return this.authService.signup(dto, req)
    }
}
