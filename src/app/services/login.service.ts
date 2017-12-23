import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { User } from "../models/user";
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class LoginService extends BaseService {

    login(user: User): any {

        return this.post(`${environment.appApi.baseUrl}/login`, user);
    }

}