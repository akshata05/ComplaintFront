import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {  FormGroup ,FormControl} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from 'src/app/common/complaints';
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


@Output() complain=new EventEmitter<Complaints>();
addComplaint=new FormGroup({
title:new FormControl(''),
description:new FormControl(''),
});
  constructor(public activeModal: NgbActiveModal,private complaintService:ComplaintsServiceService) { }

  ngOnInit(): void {
    
  }
  SaveChanges(){
    try{
      this.ticket=new Complaints();
    this.ticket.title=this.addComplaint.get('title')?.value;
    this.ticket.description=this.addComplaint.get('description')?.value;
    this.ticket.status="Raised";
    this.activeModal.close();
    this.add();
   
    }
    catch(error){
      console.log(error);
    }
  }
  add(){
    this.complaintService.addComplaint(this.ticket).subscribe(data=>{this.response=data;console.log(this.response.id);this.complain.emit(this.response);});
    
  }
 
}
