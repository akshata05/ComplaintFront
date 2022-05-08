import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../Model/user.model';

const API_URL=environment.BASE_URL+'/api/authentication';
@Injectable({
  providedIn: 'root'
})
export class AuthenicationService {
  public currentUser:Observable<User>;
  private currentUserSubject:BehaviorSubject<User>;
  constructor(private http:HttpClient) {
    let storageUser;
    const storageUseraAsStr=localStorage.getItem('currentUser');
    if(storageUseraAsStr){
      storageUser=JSON.parse(storageUseraAsStr);

    }
    this.currentUserSubject=new BehaviorSubject<User>(storageUser);
    this.currentUser=this.currentUserSubject.asObservable();
   }

   public get CurrentUserValue():User{
    return this.currentUserSubject.value;
    }

    login(user:User):Observable<any>{
      return this.http.post<User>(API_URL+"/signin",user).pipe(
        map(response=>{
if(response){
  this.setSessionUser(response);
}
return response;
        })
      );
    }
    setSessionUser(user:User){
      localStorage.setItem('currentUser',JSON.stringify(user));
      this.currentUserSubject.next(user);
    }

    register(user:User):Observable<any>{
      return this.http.post(API_URL+"/signUp",user);}
logOut(){
  localStorage.removeItem('currentUser');
this.currentUserSubject.next(new User);
}
refreshToken():Observable<any>{
  return this.http.post(API_URL+"/refresh_token?token="+this.CurrentUserValue?.refreshToken,{});
}
}

