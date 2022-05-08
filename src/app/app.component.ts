import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './Model/role.enum';
import { User } from './Model/user.model';
import { AuthenicationService } from './service/authenication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ComplaintBox';

  currentUser:User=new User();
  constructor(private authenticationService:AuthenicationService,private router:Router){
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUser=data;
    })

  }
  getRole():Role{
    return this.currentUser?.role;
    
    
  }
  logOut(){
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  
  }
}
