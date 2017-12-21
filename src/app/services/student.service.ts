import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class StudentService extends BaseService {

  /**
   * 
   */
  getAllStudents(): Observable<any> {
    return this.get(`${environment.appApi.baseUrl}/students`, "");
  }

  postStudent(registerStudent: Observable<any>): Observable<any> {
    return this.post(`${environment.appApi.baseUrl}/student/`, registerStudent);
  }

  putStudentById(id: string, updateStudent: any): Observable<any> {
    return this.put(`${environment.appApi.baseUrl}/student/`, updateStudent);
  }

  deleteStudentById(id: string): any {
    return this.post(`${environment.appApi.baseUrl}/delStudent/`, { studentId: id });
  }

}
