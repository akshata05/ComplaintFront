import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { ManagerComponent } from './manager/manager.component';
import { EngineerComponent } from './engineer/engineer.component';
import { HomeComponent } from './home/home.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ComplaintsServiceService } from './service/complaints-service.service';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditComplaintsComponent } from './complaints/edit-complaints/edit-complaints.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComplaintsComponent } from './complaints/add-complaints/add-complaints.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import { DeleteTicketComponent } from './delete-ticket/delete-ticket.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCommonModule } from '@angular/material/core';
import { ShortKeysDirective } from './short-keys.directive';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    ManagerComponent,
    EngineerComponent,
    HomeComponent,
    ComplaintsComponent,
    EditComplaintsComponent,
    AddComplaintsComponent,
    DeleteTicketComponent,
    ShortKeysDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
MatCommonModule,

    NgxPaginationModule
   
  ],
  providers: [ComplaintsServiceService, NgbActiveModal,MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
