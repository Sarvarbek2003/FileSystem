import { Controller,Get,Render,ForbiddenException, Res,UseGuards, Dependencies, Param, Query} from "@nestjs/common";
import { renderService } from "./rend.service";
import { createReadStream, appendFileSync } from 'fs';
import { join } from "path";
import { AuthGuard } from "@nestjs/passport";


@Controller('')
@Dependencies(renderService)
export class renderController {
  constructor(public rendService:renderService){}
  @Get("")
  @Render('index.html')
   home(){}

  @Get("auth/login")
  @Render('login.html')
  log(){} 

  @Get("auth/signup")
  @Render('register.html')
  reg() {}

  @Get("download")
  download(@Res() res, @Query() req) {
    try {
      const path = req.path;
      res.setHeader('Content-disposition', 'attachment; filename=' + path.split('/')[path.split('/').length - 1]);
      const filestream = createReadStream(join(process.cwd(), 'files', path));
      filestream.pipe(res);
    } catch (error) {
      throw new  ForbiddenException('Error')
    }
  }
}