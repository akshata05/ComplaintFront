import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {  FormGroup ,FormControl} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from 'src/app/common/complaints';
import { User } from 'src/app/Model/user.model';
import { AuthenicationService } from 'src/app/service/authenication.service';
import { ComplaintsServiceService } from 'src/app/service/complaints-service.service';
import { ComplaintsComponent } from '../complaints.component';



@Component({
  selector: 'app-add-complaints',
  templateUrl: './add-complaints.component.html',
  styleUrls: ['./add-complaints.component.css']
})
export class AddComplaintsComponent implements OnInit  {

ticket!:Complaints;
response!:Complaints;
currentUser:User=new User();

@Output() complain=new EventEmitter<Complaints>();
@Output() statusOk=new EventEmitter<any>();
oksataus:any;
addComplaint=new FormGroup({
title:new FormControl(''),

description:new FormControl(''),
});
  constructor(public activeModal: NgbActiveModal,private complaintService:ComplaintsServiceService,private authenticationService:AuthenicationService) { 
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUser=data;  
    

    });
  }

  ngOnInit(): void {
    
  }
  SaveChanges(){
    try{
      this.ticket=new Complaints();
    this.ticket.title=this.addComplaint.get('title')?.value;
    this.ticket.description=this.addComplaint.get('description')?.value;
    this.activeModal.close();
    this.add();
   
    }
    catch(error){
      console.log(error);
    }
  }
  add(){
    this.complaintService.addComplaint(this.ticket,this.currentUser.id).subscribe(data=>{this.oksataus=data;this.statusOk.emit(this.oksataus);});
    
  }
 
}
