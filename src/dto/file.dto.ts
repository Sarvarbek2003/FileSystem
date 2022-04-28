import { IsNumber, IsString, Length } from "class-validator"

export class FileDto {
    @IsString()
    @Length(3,50)
    fileName

    @IsString()
    @Length(3,300)
    title
}