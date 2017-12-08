import {Injectable} from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User} from "../models/user";

@Injectable()
export class LoginService {

    private loginUrl = 'http://localhost:8080/api/login';  // URL to web api

    constructor(private http: Http) { }

    login(user: User): Promise<User>  {
        return this.post(user);
    }

    private post(user: User): Promise<User> {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'});

        return this.http
            .post(this.loginUrl, JSON.stringify(user), {headers:headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}