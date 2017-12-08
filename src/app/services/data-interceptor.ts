import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ):
    Observable<HttpEvent<any>> {

    //YOUR CODE HERE
    // if (req.method === 'GET') {
    //   return next.handle(req);
    // }

    // Get the auth header from the service.
    // const authHeader = this.auth.getAuthorizationHeader();
    // Clone the request to add the new header.
    // const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
    // const authReq = req.clone({ setHeaders: { Authorization: authHeader } });
 

    return next.handle(req);
  }
}