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
import { NewComplainComponent } from './Complains/new-complain/new-complain.component';
import { EscalatedComplainComponent } from './Complains/escalated-complain/escalated-complain.component';
import { ResolvedComplainComponent } from './Complains/resolved-complain/resolved-complain.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound/notfound.component';

const routes:Routes=[
{path:"new",component:NewComplainComponent},
{path:"escalated",component:EscalatedComplainComponent},
{path:"resolved",component:ResolvedComplainComponent},
{path:"404",component:NotfoundComponent},
{path:"",redirectTo:"new",pathMatch:"full"}
]
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
    ShortKeysDirective,
    NewComplainComponent,
    EscalatedComplainComponent,
    ResolvedComplainComponent,
    NotfoundComponent
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

    NgxPaginationModule,
    RouterModule.forRoot(routes)
   
  ],
  providers: [ComplaintsServiceService, NgbActiveModal,MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
