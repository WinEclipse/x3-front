import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseService {
    public paramsBody = {
        token: "",
        random: "",
        timestamp: "",
        body: {}
    };

    constructor(private http: HttpClient) {
    }

    private options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Credentials', 'true'),
        params: new HttpParams()
    }

    post(url: string, params: any) {
        this.paramsBody.body = params;
        return this.http.post(url, this.paramsBody, this.options);
    }

    delete(url: string, params: string) {
        this.paramsBody.body = params;
        return this.http.post(url, this.paramsBody, this.options);
    }

    get(url: string, params: any) {
        this.paramsBody.body = params;
        return this.http.get(url, params);
    }

    put(url: string, params: Observable<any>) {
        this.paramsBody.body = params;
        console.log("put", this.paramsBody);
        return this.http.put(url, this.paramsBody, this.options);
    }
}