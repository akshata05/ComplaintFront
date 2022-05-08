import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from 'src/app/common/complaints';
import { Role } from 'src/app/Model/role.enum';
import { User } from 'src/app/Model/user.model';
import { AuthenicationService } from 'src/app/service/authenication.service';
import { ComplaintsServiceService } from 'src/app/service/complaints-service.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  currentUser:User=new User();
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
  constructor(private complaintService:ComplaintsServiceService,public modalService: NgbModal,private authenticationService:AuthenicationService) {
   
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
    this.complaintService.GetComplainByStatus("Completed",this.currentUser.id).subscribe(data=>{this.complaints=data;console.log(this.complaints)});
  }
  else if(this.currentUser.role==Role.Engineer){
    this.complaintService. GetComplainByStatusForEngineers("Completed",this.currentUser.id).subscribe(data=>{this.complaints=data;console.log(this.complaints)});
  }
  
   else{ this.complaintService.GetComplains("Completed").subscribe(data=>{this.complaints=data;console.log(this.complaints)});}  

 }



  
}




