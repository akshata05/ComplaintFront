import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from '../common/complaints';
import { ComplaintsServiceService } from '../service/complaints-service.service';
import { AddComplaintsComponent } from './add-complaints/add-complaints.component';
import { EditComplaintsComponent } from './edit-complaints/edit-complaints.component';
import {MatDialog} from '@angular/material/dialog';
import { DeleteTicketComponent } from '../delete-ticket/delete-ticket.component';
import { LodingService } from '../loding.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  
})
export class ComplaintsComponent implements OnInit {
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
  constructor(private complaintService:ComplaintsServiceService,public modalService: NgbModal,private load:LodingService) {
    this.singleComplaints=new Complaints();
     }

  ngOnInit(): void {
    this.getList();
    
  }
  
 public getList():void{
  
 this.complaintService.ViewComplaint().subscribe(data=>{this.complaints=data;console.log(this.complaints)});

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
  
this.complaintService.ViewOneComplaint(id).subscribe((data)=>{this.singleComplaints=data;
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
      this.load.ShouldStoploading(true);
      console.log("success");
    }
    

  });
}

}
