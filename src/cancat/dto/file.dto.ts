import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

export class FileDto {
    @IsString()
    @Length(3,50)
    @ApiProperty({type: String, description: 'File name'})
    fileName
}