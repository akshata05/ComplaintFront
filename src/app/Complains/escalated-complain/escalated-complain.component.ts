import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from 'src/app/common/complaints';
import { AddComplaintsComponent } from 'src/app/complaints/add-complaints/add-complaints.component';
import { EditComplaintsComponent } from 'src/app/complaints/edit-complaints/edit-complaints.component';
import { DeleteTicketComponent } from 'src/app/delete-ticket/delete-ticket.component';
import { Role } from 'src/app/Model/role.enum';
import { User } from 'src/app/Model/user.model';
import { AuthenicationService } from 'src/app/service/authenication.service';
import { ComplaintsServiceService } from 'src/app/service/complaints-service.service';

@Component({
  selector: 'app-escalated-complain',
  templateUrl: './escalated-complain.component.html',
  styleUrls: ['./escalated-complain.component.css']
})
export class EscalatedComplainComponent implements OnInit {
  currentUser:User=new User();
  complaints!:Complaints[];
  singleComplaints!:Complaints;
  addComplaints!:Complaints;
  isadded=false;
  showModal=false;
  role=Role;
  interval: any;
  page: number = 1;
  ticketid!:number;
  @Input() id!: string;
@Input() maxSize!: number;
@Output() pageChange!: EventEmitter<number>;
@Output() pageBoundsCorrection!: EventEmitter<number>;
  constructor(private complaintService:ComplaintsServiceService,public modalService: NgbModal,private authenticationService:AuthenicationService) {
    this.singleComplaints=new Complaints();
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUser=data;
    });
     }

  ngOnInit(): void {
    this.getList();
    
  }
  
 public getList():void{
  if(this.currentUser.role===Role.User)
  {
    this.complaintService.GetComplainByStatus("Escalated",this.currentUser.id).subscribe(data=>{this.complaints=data;console.log(this.complaints)});
  }
  else if(this.currentUser.role==Role.Engineer){
    this.complaintService. GetComplainByStatusForEngineers("Escalated",this.currentUser.id).subscribe(data=>{this.complaints=data;console.log(this.complaints)});
  }
  
   else{ this.complaintService.GetComplains("Escalated").subscribe(data=>{this.complaints=data;console.log(this.complaints)});}  

 }
AddNew(){

  const modalRef = this.modalService.open(AddComplaintsComponent);  
  modalRef.componentInstance.complain.subscribe((complaint: Complaints) => {
  this.singleComplaints=complaint;
  if(complaint!=null){
   // this.getList();
   console.log(true);
    this.complaints.push(this.singleComplaints);
  }
  
    })
    
}

edit(num:number){

  this.showModal=true;
 
console.log(num);

}
openModal(event:Event) {
  this.singleComplaints=new Complaints();
  let id=(event.target as HTMLElement).id as unknown as number;
  
this.complaintService.ViewOneComplaint(id).subscribe((data: Complaints)=>{this.singleComplaints=data;
  const modalRef = this.modalService.open(EditComplaintsComponent);
  console.log(this.singleComplaints.title);
    modalRef.componentInstance.complaints = this.singleComplaints;
modalRef.componentInstance.complaintsChange.subscribe((receivedEntry: any) => {
  if(receivedEntry!=null){
 this.getList();
  }
})
});

  
}
openDialog(event:Event) {
  this.ticketid=(event.target as HTMLElement).id as unknown as number;
  console.log(this.ticketid);
  const dialogRef=this.modalService.open(DeleteTicketComponent);
  dialogRef.componentInstance.id= this.ticketid;
  dialogRef.componentInstance.value.subscribe((response:any)=>{
    if(response==200){
      this.getList();
      console.log("success");
    }
    

  });
}

}
