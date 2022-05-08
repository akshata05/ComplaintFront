import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Model/role.enum';
import { User } from 'src/app/Model/user.model';
import { AuthenicationService } from 'src/app/service/authenication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user:User=new User();
errorMessage:String="";
isSelected=true;
 roles=Role;
  constructor(private authenticationService:AuthenicationService,private router:Router) {

   
   }

  ngOnInit(): void {
    if(this.authenticationService.CurrentUserValue?.id){
      this.router.navigate(['/new']);
    }
  }
register(){
  console.log(this.user.role);
  this.authenticationService.register(this.user).subscribe(data=>{
this.router.navigate(['/login']);
  },err=>{
    if(err?.status===409){
this.errorMessage="Username already exizt";
    }else{
      this.errorMessage="Unexpected error occurred";
      console.log(err);
    }
  }
 
  );
}
}
