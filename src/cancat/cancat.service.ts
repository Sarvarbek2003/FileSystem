import { Injectable } from '@nestjs/common';
import XLSX from 'xlsx';
import xlsx from 'node-xlsx';
import { readFileSync, writeFileSync} from 'fs';
import {cancat} from './cancat'

@Injectable()
export class CancatService {
    constructor(private can: cancat){}
    cancat(files){  
        return this.can.can(files)
    }
}
