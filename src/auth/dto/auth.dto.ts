import { IsString,IsNotEmpty, IsEmail, Length } from "class-validator"

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    @Length(3,15)
    username
    
    @IsString()
    @IsNotEmpty()
    @Length(3,15)
    password

    @IsNotEmpty()
    @IsEmail()
    email
} 