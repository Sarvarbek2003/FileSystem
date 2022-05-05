import { IsString,IsNotEmpty, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
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
} 