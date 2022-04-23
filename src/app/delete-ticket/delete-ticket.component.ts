import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComplaintsServiceService } from '../service/complaints-service.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LodingService } from '../loding.service';
@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.css']
})
export class DeleteTicketComponent implements OnInit {
 stop=false;
  @Output() value = new EventEmitter<number>();
  constructor(private complaintService:ComplaintsServiceService, public activeModal: NgbActiveModal) { }
  @Input()  id!: number;
  response!:number;
  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close();
  }
Delete(){
  this.DeleteComplain();
  this.closeModal();
}
DeleteComplain(){
 this.stop=true;
  this.complaintService.deleteComplaint(this.id).subscribe((response)=>{this.response=response; this.value.emit(response);
   
    });
  
 // this.load.stoploading$.subscribe(response=>{if(response==true){this.stop=false;}});
}
}
