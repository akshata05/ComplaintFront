import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LodingService } from './loding.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {CommonModule} from '@angular/common';
describe('LodingService', () => {
  let service: LodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
