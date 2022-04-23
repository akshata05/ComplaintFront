import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from 'src/app/common/complaints';
import { ComplaintsServiceService } from 'src/app/service/complaints-service.service';

@Component({
  selector: 'app-edit-complaints',
  templateUrl: './edit-complaints.component.html',
  styleUrls: ['./edit-complaints.component.css']
})
export class EditComplaintsComponent implements OnInit {
  @Input()  complaints!: Complaints;
  response!:Complaints;
  @Output() complaintsChange = new EventEmitter<Complaints>();
  constructor( public activeModal: NgbActiveModal,private complaintService:ComplaintsServiceService) { }

  ngOnInit(): void {
    
  }
  closeModal(message: string) {
    this.activeModal.close();
  }
  SaveChanges(){
    
this.complaintService.updateComplaint(this.complaints).subscribe(data=>{this.response=data;console.log(this.response.id);this.complaintsChange.emit(this.response);});
   // this.complaintsChange.emit(this.complaints);
    this.activeModal.close();
  }
}
