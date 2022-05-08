import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from 'src/app/common/complaints';
import { Role } from 'src/app/Model/role.enum';
import { User } from 'src/app/Model/user.model';
import { AuthenicationService } from 'src/app/service/authenication.service';
import { ComplaintsServiceService } from 'src/app/service/complaints-service.service';


@Component({
  selector: 'app-edit-complaints',
  templateUrl: './edit-complaints.component.html',
  styleUrls: ['./edit-complaints.component.css']
})
export class EditComplaintsComponent implements OnInit {
  
  @Input()  complaints!: Complaints;
  @Input() users!:User[];
  response!:Complaints;
  role=Role;
  engineer!:User;
  isdisabled=false;
  @Output() complaintsChange = new EventEmitter<Complaints>();
  currentUser:User=new User();
  constructor( public activeModal: NgbActiveModal,private complaintService:ComplaintsServiceService,private authenticationService:AuthenicationService) {
  this.response=new Complaints();
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUser=data;  
      if(this.currentUser.role==this.role.Manager || this.currentUser.role===this.role.Engineer || this.complaints.complainStatus.status!="New")
      {this.isdisabled=true;}  

    });
   }

  ngOnInit(): void {
    
  }
  closeModal(message: string) {
    this.activeModal.close();
  }
  SaveChanges(){
    const role=this.currentUser.role;
    
      if(role==Role.Engineer) {
        this.complaintService.AddResolution(this.complaints.complainStatus,this.complaints.ticketId).subscribe((data)=>{
          this.response=data;
          console.log(this.response.ticketId);
          this.complaintsChange.emit(this.response);
          
        })
      }
       
      else if(role==Role.User){
        this.complaintService.AddFeedback(this.complaints.complainStatus,this.complaints.ticketId).subscribe((data)=>{
          this.response=data;
          console.log(this.response.ticketId);
          this.complaintsChange.emit(this.response);
          
        })
      }
      else if(role==Role.Manager){ this.complaintService.AssignEngineer(this.engineer.id,this.complaints.ticketId).subscribe((data)=>{
        this.response=data;
        console.log(this.response.ticketId);
        this.complaintsChange.emit(this.response);
        
      });}
        
           
        
  
//this.complaintService.updateComplaint(this.complaints).subscribe(data=>{this.response=data;console.log(this.response.ticketId);this.complaintsChange.emit(this.response);});
   // this.complaintsChange.emit(this.complaints);
    this.activeModal.close();
  }
}
