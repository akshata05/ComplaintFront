import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../Model/user.model';
import { AuthenicationService } from '../service/authenication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private currentUser:User=new User();
  constructor(private authenticationService:AuthenicationService,private router:Router){
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUser=data;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.currentUser){
        if(route.data.roles?.indexOf(this.currentUser.role)===-1){
          this,this.router.navigate(['/401']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/login']);
    return true;
  }
  
}
