import { Injectable } from "@nestjs/common";
import { Request, Response } from 'express';
import { appendFileSync, existsSync, mkdirSync} from "fs";


@Injectable({})
export class MyLogger {
    date: string;
    constructor(){
        let d = new Date()
        this.date = new Date(d).toLocaleString('uz-UZ')
    }
    log(req: Request, comment: string, response){
        let username = req.user['username'] 
        let path = req.route.path 
        let method = req.method
        let ip = req.ip
        let userAgent = req.headers['user-agent']
        let body = JSON.stringify(req.body)

        if(!existsSync('logs/'+username)){
            mkdirSync('logs/'+username);
        }
        appendFileSync('logs/'+username+'/log.txt', '\n'+this.date+' '+ip+' '+path+' '+method+' '+body+' '+userAgent+' '+comment+' ---> Response '+JSON.stringify(response) )
    }

    error(req: Request,error){
        let username = req.user['username'] 
        let path = req.route.path 
        let method = req.method
        let ip = req.ip
        let userAgent = req.headers['user-agent']
        let body = JSON.stringify(req.body)

        if(!existsSync('logs/'+username)){
            mkdirSync('logs/'+username);
        }
        appendFileSync('logs/'+username+'/error.txt', '\n'+this.date+' '+ip+' '+path+' '+method+' '+body+' '+userAgent+' ---> Response '+error.message )
    }
}