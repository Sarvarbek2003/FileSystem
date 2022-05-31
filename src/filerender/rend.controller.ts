import { Controller,Get,Render,ForbiddenException, Res,Req, UseGuards, Dependencies, Param, Query} from "@nestjs/common";
import { renderService } from "./rend.service";
import { createReadStream, appendFileSync } from 'fs';
import { join } from "path";
import { NextFunction, Request } from 'express';
import { AuthGuard } from "@nestjs/passport";
import { MyLogger } from 'src/logger/create-log';

@Controller('')
@Dependencies(renderService)
export class renderController {
  constructor(public rendService:renderService, private logger: MyLogger){}
  @Get("")
  @Render('index.html')
   home(@Req() req: Request){
     
    }

  @Get("auth/login")
  @Render('login.html')
  log(@Req() req: Request){} 

  @Get("auth/signup")
  @Render('register.html')
  reg(@Req() req: Request) {}

  @Get("download")
  download(@Req() request:Request, @Res() res, @Query() req) {
    try {
      let func = new MyLogger()
      // func.log(req,'Download',req.path)
      console.log(request)
      const path = req.path;
      res.setHeader('Content-disposition', 'attachment; filename=' + path.split('/')[path.split('/').length - 1]);
      const filestream = createReadStream(join(process.cwd(), 'files', path));
      filestream.pipe(res);
    } catch (error) {
      this.logger.error(request,error.message)
      throw new  ForbiddenException('Error')
    }
  }
}