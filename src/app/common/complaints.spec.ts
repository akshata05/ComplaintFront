import { Complaints } from './complaints';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {CommonModule} from '@angular/common';
describe('Complaints', () => {
  it('should create an instance', () => {
    expect(new Complaints()).toBeTruthy();
  });
});
