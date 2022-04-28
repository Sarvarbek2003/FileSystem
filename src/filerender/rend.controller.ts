import { Controller,Get,Render, Res,UseGuards, Dependencies, Param} from "@nestjs/common";
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

  @Get("download/:filename")
  download(@Res() res, @Param() req) {
    const filename = req.filename;
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    const filestream = createReadStream(join(process.cwd(), 'files', filename));
    filestream.pipe(res);
  }
}