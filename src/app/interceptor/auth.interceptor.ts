import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenicationService } from '../service/authenication.service';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from '../Model/user.model';
const HEADER_AUTHORIZATION="authorization";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
private jwt:JwtPayload={}
  constructor(private authenticationService:AuthenicationService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.headers.has(HEADER_AUTHORIZATION)){
      return this.handleToken(request,next);
    }else{return next.handle(request);}
    
  }
  handleToken(request: HttpRequest<unknown>, next: HttpHandler) {
    this.jwt=jwt_decode(this.authenticationService.CurrentUserValue.accessToken);
    const nowInSec=Date.now()/1000;
    const exp=this.jwt.exp ||0;
    if(exp>nowInSec){
      return next.handle(request);
    }
    else{
      return this.authenticationService.refreshToken().pipe(switchMap((response:User)=>{
this.authenticationService.setSessionUser(response);
const clone=request.clone({headers:request.headers.set(HEADER_AUTHORIZATION,'Bearer '+response.accessToken)});
return next.handle(clone);
      }),
      
      catchError(err=>{
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
        return throwError(err);
      })
      );
    }
  }
}
export const authInterceptorProviders=[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]