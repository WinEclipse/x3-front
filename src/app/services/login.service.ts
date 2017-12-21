import {Injectable} from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import {User} from "../models/user";
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class LoginService extends BaseService {

    private loginUrl = 'http://localhost:8080/api/login';  // URL to web api

    

    login(user: User): any  {
        // return this.post(user);
        return this.post(`${environment.appApi.baseUrl}/login`, user);
    }

    // private post(user: User): Promise<User> {
        // let headers = new Headers({
        //     'Content-Type': 'application/x-www-form-urlencoded'});

        // return this.http
        //     .post(this.loginUrl, JSON.stringify(user), {headers:headers})
        //     .toPromise()
        //     .then(response => response.json().data)
        //     .catch(this.handleError);
    // }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}