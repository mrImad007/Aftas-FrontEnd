import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //:ADD AUTHORIZATION HEADER TOKEN THAT ALREADY EXIST IN LOCAL STORAGE  ELSE ADD
    const Authorization = localStorage.getItem('access_token');
    console.log("const authorisation : " + Authorization);
    if (Authorization) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${Authorization}`}
      });
      console.log("the auth is done : ")
      console.log(request);
      
      return next.handle(request);
    }

    // If there is no token, pass the original request
    console.log("If there is no token, pass the original request");
    return next.handle(request);
  }
}
