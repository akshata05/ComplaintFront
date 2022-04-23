import { HttpClientTestingModule } from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ComplaintsServiceService } from "../service/complaints-service.service";
import { DeleteTicketComponent } from "./delete-ticket.component";
import { Observable, of } from 'rxjs';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
describe('Test the delete request option',()=>{
  let component:DeleteTicketComponent;
  let activeModal: NgbActiveModal;
beforeEach(fakeAsync(()=>{


TestBed.configureTestingModule({
  imports:[HttpClientTestingModule],
providers:[ComplaintsServiceService,NgbActiveModal]
});

}));
it('test delete method',fakeAsync(()=>{
  const fixture=TestBed.createComponent(DeleteTicketComponent);
  const comp=fixture.componentInstance;
  const spy=spyOn(comp,'closeModal');
  fixture.detectChanges();

let mockdeleteService=jasmine.createSpyObj("ComplaintsServiceService",['deleteComplaint']);
component=new DeleteTicketComponent(mockdeleteService,activeModal);
mockdeleteService.deleteComplaint.and.returnValue(of(200));
component.id=1;
component.DeleteComplain();
tick(100);
expect(component.response).toEqual(200);
}));

});