import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
// import 'rxjs/add/operator/map';
// import { HttpHeaders, HttpParams } from "@angular/common/http";
// import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {environment} from '../../environments/environment';
import { BaseService } from './base.service';

//Interface
interface ItemsResponse {
  results: string[];
}

@Injectable()
export class DataService extends BaseService {

  results: any;

  constructor(private httpa: HttpClient) { 
    super(httpa);
  } 


  //GET All : Student
  getAllStudents(): Observable<any> {
    return this.httpa.get<string[]>(`${environment.appApi.baseUrl}/students`);
    // .retry(3);
  }

  //GET BY ID : Student
  // getStudentById(id: any): Observable<any> {

  //   return this.http.get(`${environment.appApi.baseUrl}/user`,
  //     {
  //       params: new HttpParams().set('id', id)
  //     });

  // }

  getStudentById(id: any): any {

  }

  //POST : Student
  // postStudent(registerStudent: any): Observable<any> {

    // return this.http.post(`${environment.appApi.baseUrl}/student/`,
    //   JSON.stringify(registerStudent),
    //   {
    //     headers: new HttpHeaders().set('Content-Type', 'application/json')
    //   });
  // }

  postStudent(registerStudent: Observable<any>): Observable<any> {
    console.log("type:", typeof registerStudent );
    return this.post(`${environment.appApi.baseUrl}/student/`, registerStudent);
  }

  putStudentById(id: any, updateStudent: any): Observable<any> {
    return this.put(`${environment.appApi.baseUrl}/student/` + id, updateStudent);
  }

  //PUT : Student
  // putStudentById(id: any, updateStudent: any): Observable<any> {

  //   return this.http.put(`${environment.appApi.baseUrl}/user/` + id,
  //     JSON.stringify(updateStudent),
  //     {
  //       headers: new HttpHeaders()
  //         .set('Content-Type', 'application/json')
  //         .set('Access-Control-Allow-Origin', '*')
  //         .set('Access-Control-Allow-Credentials', 'true')

  //     });    

  // }

  deleteStudentById(id: any): any {}

  // //DELETE : Student
  // deleteStudentById(id: any): Observable<any> {

  //   return this.http.delete('http://localhost:53811/api/Student/DeleteStudentById/' + id,
  //   // return this.http.delete('http://localhost:53811/api/Student/DeleteStudentById/',
  //     {
  //       // params: new HttpParams().set('id', '6'),        
  //       headers: new HttpHeaders().set('Content-Type', 'application/json'),

  //     });

  // }

}
