import { AfterContentChecked, Component, EventEmitter, Input, NgModuleRef, OnInit, Output } from '@angular/core';
import { Complaints } from 'src/app/common/complaints';
import { AddComplaintsComponent } from 'src/app/complaints/add-complaints/add-complaints.component';
import { EditComplaintsComponent } from 'src/app/complaints/edit-complaints/edit-complaints.component';
import { ComplaintsServiceService } from 'src/app/service/complaints-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteTicketComponent } from 'src/app/delete-ticket/delete-ticket.component';
import { User } from 'src/app/Model/user.model';
import { AuthenicationService } from 'src/app/service/authenication.service';
import { Role } from 'src/app/Model/role.enum';

@Component({
  selector: 'app-new-complain',
  templateUrl: './new-complain.component.html',
  styleUrls: ['./new-complain.component.css']
})
export class NewComplainComponent {
  currentUser:User=new User();
  complaints!:Complaints[];
  singleComplaints!:Complaints;
  addComplaints!:Complaints;
  isadded=false;
  showModal=false;
  interval: any;
  page: number = 1;
  ticketid!:number;
  role=Role;
  users:User[]=[];
  results:User[]=[];
   @Input() id!: string;
@Input() maxSize!: number;
@Output() pageChange!: EventEmitter<number>;
@Output() pageBoundsCorrection!: EventEmitter<number>;
  constructor(private complaintService:ComplaintsServiceService,public modalService: NgbModal,private authenticationService:AuthenicationService) {
    this.singleComplaints=new Complaints();
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUser=data;
      if(this.currentUser.role==this.role.Manager){
        this.complaintService.GetEngineers().subscribe(response=>{localStorage.setItem('users',JSON.stringify(response));
        this.users=JSON.parse(localStorage.getItem('users')||'{}');  
      })   
             
      }
    });

     }

  ngOnInit(): void {
    this.getList();
    
  }
  
 public getList():void{
 
if(this.currentUser.role===Role.User)
{
  this.complaintService.GetComplainByStatus("New",this.currentUser.id).subscribe(data=>{this.complaints=data;console.log(this.complaints)});
}
 else if(this.currentUser.role===Role.Manager){ this.complaintService.GetComplains("New").subscribe(data=>{this.complaints=data;console.log(this.complaints)});}   
  
  

 }
AddNew(){

  const modalRef = this.modalService.open(AddComplaintsComponent);  
  modalRef.componentInstance.statusOk.subscribe((data: any) => {
 

  
    })
    this.getList();
}

edit(num:number){

  this.showModal=true;
 
console.log(num);

}
openModal(event:Event) {

  this.singleComplaints=new Complaints();
  let id=(event.target as HTMLElement).id as unknown as number;
  this.complaintService.GetPincode(id).subscribe((response)=>{
    this.results=this.users.filter(obj=>{
      return obj.pincode==response;
      
    });
    
    this.complaintService.ViewOneComplaint(id).subscribe((data: Complaints)=>{this.singleComplaints=data;
      const modalRef = this.modalService.open(EditComplaintsComponent);
      console.log(this.singleComplaints.title);
        modalRef.componentInstance.complaints = this.singleComplaints;
        modalRef.componentInstance.users=this.results;

    modalRef.componentInstance.complaintsChange.subscribe((receivedEntry: any) => {
      if(receivedEntry!=null){
     this.getList();
      }
    })
    });
  })


  
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
