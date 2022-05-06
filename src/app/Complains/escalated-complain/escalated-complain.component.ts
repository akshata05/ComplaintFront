import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from 'src/app/common/complaints';
import { AddComplaintsComponent } from 'src/app/complaints/add-complaints/add-complaints.component';
import { EditComplaintsComponent } from 'src/app/complaints/edit-complaints/edit-complaints.component';
import { DeleteTicketComponent } from 'src/app/delete-ticket/delete-ticket.component';
import { ComplaintsServiceService } from 'src/app/service/complaints-service.service';

@Component({
  selector: 'app-escalated-complain',
  templateUrl: './escalated-complain.component.html',
  styleUrls: ['./escalated-complain.component.css']
})
export class EscalatedComplainComponent implements OnInit {

  complaints!:Complaints[];
  singleComplaints!:Complaints;
  addComplaints!:Complaints;
  isadded=false;
  showModal=false;
  interval: any;
  page: number = 1;
  ticketid!:number;
  @Input() id!: string;
@Input() maxSize!: number;
@Output() pageChange!: EventEmitter<number>;
@Output() pageBoundsCorrection!: EventEmitter<number>;
  constructor(private complaintService:ComplaintsServiceService,public modalService: NgbModal) {
    this.singleComplaints=new Complaints();
     }

  ngOnInit(): void {
    this.getList();
    
  }
  
 public getList():void{
  
 this.complaintService.GetComplainByStatus("Escalated").subscribe(data=>{this.complaints=data;console.log(this.complaints)});

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
