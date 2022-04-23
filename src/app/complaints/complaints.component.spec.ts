import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplaintsComponent } from './complaints.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {CommonModule} from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from '../common/complaints';
import { ComplaintsServiceService } from '../service/complaints-service.service';
import { AddComplaintsComponent } from './add-complaints/add-complaints.component';
import { EditComplaintsComponent } from './edit-complaints/edit-complaints.component';
import {MatDialog} from '@angular/material/dialog';
import { DeleteTicketComponent } from '../delete-ticket/delete-ticket.component';
import { LodingService } from '../loding.service';

describe('ComplaintsComponent', () => {
  let component: ComplaintsComponent;
  let fixture: ComponentFixture<ComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsComponent ],
      imports: [HttpClientTestingModule,NgbModule],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
