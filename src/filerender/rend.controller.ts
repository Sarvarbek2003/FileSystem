import { Controller,Get,Render, Res,UseGuards, Dependencies, Param, Query} from "@nestjs/common";
import { renderService } from "./rend.service";
import { createReadStream } from 'fs';
import { join } from "path";


@Controller('')
@Dependencies(renderService)
export class renderController {
  constructor(public rendService:renderService){}
  @Get("")
  @Render('index.html')
   home(){}

  @Get("download")
  download(@Res() res, @Query() req) {
    const path = req.path;
    res.setHeader('Content-disposition', 'attachment; filename=' + path.split('/')[path.split('/').length - 1]);
    const filestream = createReadStream(join(process.cwd(), 'files', path));
    filestream.pipe(res);
  }
}