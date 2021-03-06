import { IsString,IsNotEmpty, IsEmail, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    @Length(3,15)
    @ApiProperty({type: String, description: 'username'})
    username
    
    @IsString()
    @IsNotEmpty()
    @Length(3,15)
    @ApiProperty({type: String, description: 'password'})
    password

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({type: String, description: 'email'})
    email
} 