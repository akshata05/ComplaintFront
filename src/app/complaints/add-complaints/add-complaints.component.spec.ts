import { AddComplaintsComponent } from '../add-complaints/add-complaints.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComplaintsServiceService } from 'src/app/service/complaints-service.service';
import { Observable, of } from 'rxjs';
import { Complaints } from 'src/app/common/complaints';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from 'src/app/app.component';
import { delay } from 'rxjs/operators';
describe('AddComplaintsComponent',()=>{
let component:AddComplaintsComponent;
let activeModal: NgbActiveModal;
let service:ComplaintsServiceService;
let complain:Complaints;
let httpTestingController:HttpTestingController;
let baseUrl="http://localhost:8080/fetch/1";
beforeEach(fakeAsync(()=>{
TestBed.configureTestingModule({
  imports:[HttpClientTestingModule],
providers:[ComplaintsServiceService]
});
httpTestingController=TestBed.inject(HttpTestingController);
complain={
  id:1,
  title:"what",
  description:"ok",
  status:"Raised"
};
}));

it('should call Post api to create new complain',fakeAsync(()=>{

 let  mockaddService= jasmine.createSpyObj('ComplaintsServiceService',['addComplaint'],['ViewOneComplaint']);
 component=new AddComplaintsComponent(activeModal,mockaddService);

  mockaddService.addComplaint.and.returnValue(of(complain));

  component.ticket=complain;
tick(500)
component.add();
tick(100);
expect(component.response).toEqual(complain);

console.log(component.response);

}));

});
