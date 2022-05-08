import { Component, OnInit } from '@angular/core';
import { Role } from '../Model/role.enum';
import { User } from '../Model/user.model';
import { AuthenicationService } from '../service/authenication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser:User=new User();
  role=Role;
  constructor(private authenticationService:AuthenicationService) { this.authenticationService.currentUser.subscribe(data=>{
    this.currentUser=data;
  }); }

  ngOnInit(): void {
  }

}
