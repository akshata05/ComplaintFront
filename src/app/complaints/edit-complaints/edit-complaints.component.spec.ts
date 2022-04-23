import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {CommonModule} from '@angular/common';
import { EditComplaintsComponent } from './edit-complaints.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Complaints } from 'src/app/common/complaints';
import { ComplaintsServiceService } from 'src/app/service/complaints-service.service';


describe('EditComplaintsComponent', () => {
  let component: EditComplaintsComponent;
  let fixture: ComponentFixture<EditComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComplaintsComponent ],
      imports: [HttpClientTestingModule,NgbModule],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
