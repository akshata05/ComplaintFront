import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Model/role.enum';
import { User } from 'src/app/Model/user.model';
import { AuthenicationService } from 'src/app/service/authenication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User=new User();
  currentUser:User=new User();
  errorMessage:String="";
  role=Role;
  constructor(private authenticationService:AuthenicationService,private router:Router) {
  
  
  }

 ngOnInit(): void {
  //  if(this.authenticationService.CurrentUserValue?.id){
  //    this.router.navigate(['/new']);
  //  }
 }

 login(){
  this.authenticationService.login(this.user).subscribe(data=>{
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUser=data;
      if(this.currentUser.role==this.role.Engineer)
      {
        this.router.navigate(['/escalated']);
      }else{this.router.navigate(['/new']);}
      
    });


  },err=>{
    if(err?.status===409){
this.errorMessage="Username or Password incorrect";
    }else{
      this.errorMessage="Unexpected error occurred";
    }
  }
 
  );
}
}
