import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

export class BaseService {
    public paramsBody = {
        token: "",
        random: "",
        timestamp: "",
        body: {}
    };

    private options = {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Credentials', 'true'),
        params: new HttpParams()
    }

    constructor(private http: HttpClient) { }

    post(url: string, params: Observable<any>) {
        this.paramsBody.body = params;
        console.log("post", this.paramsBody);
        return this.http.post(url, this.paramsBody, this.options);
    }

    delete(url: string, params: string) {
        this.paramsBody.body = params;
        console.log(this.paramsBody);
        return this.http.post(url, this.paramsBody, this.options);
    }

    get(url: string, params: any) {
        this.paramsBody.body = params;
        console.log(this.paramsBody);
        // this.options.params.;
        return this.http.get(url, params);
    }

    put(url: string, params: Observable<any>) {
        this.paramsBody.body = params;
        console.log("put", this.paramsBody);
        return this.http.put(url, this.paramsBody, this.options);
    }
}