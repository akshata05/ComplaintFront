import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalatedComplainComponent } from './escalated-complain.component';

describe('EscalatedComplainComponent', () => {
  let component: EscalatedComplainComponent;
  let fixture: ComponentFixture<EscalatedComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalatedComplainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalatedComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
