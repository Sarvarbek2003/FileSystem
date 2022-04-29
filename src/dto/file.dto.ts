import { IsString, Length } from "class-validator"

export class FileDto {
    @IsString()
    @Length(3,50)
    fileName
}