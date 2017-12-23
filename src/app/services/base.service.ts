import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { HttpHeaders, HttpParams, HttpEvent } from "@angular/common/http";
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { RequestMsg } from '../models/request';
import { ResponseMsg } from '../models/response';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class BaseService {

    reqMsg: RequestMsg;


    constructor(private http: HttpClient, private localSt: LocalStorageService) {
        this.reqMsg = new RequestMsg();
    }

    // private options = {
    //     headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
    //         .set('Access-Control-Allow-Credentials', 'true'),
    //     params: new HttpParams()
    // } 

    post(url: string, params: any): Observable<ResponseMsg> {
        this.reqMsg.body = params;
        return this.http.post<ResponseMsg>(url, this.reqMsg, this.getOptions());
    }

    delete(url: string, params: string): Observable<ResponseMsg> {
        this.reqMsg.body = params;
        return this.http.post<ResponseMsg>(url, this.reqMsg, this.getOptions());
    }

    get(url: string, params: any): Observable<ResponseMsg>{
        return this.http.get<ResponseMsg>(url, this.getOptions());
    }

    put(url: string, params: Observable<any>): Observable<ResponseMsg> {
        this.reqMsg.body = params;
        console.log("put", this.reqMsg);
        return this.http.put<ResponseMsg>(url, this.reqMsg, this.getOptions());
    }

    getOptions() {

        let headers :HttpHeaders;
        headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Credentials', 'true');
        let token: string = this.localSt.retrieve("token");
        if (token) {
            headers = headers.append("Token", token);
        }
        let options = {
            headers: headers,
            params: new HttpParams()
        } 
       
        return options;
    }
}