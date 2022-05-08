import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComplainComponent } from './new-complain.component';

describe('NewComplainComponent', () => {
  let component: NewComplainComponent;
  let fixture: ComponentFixture<NewComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComplainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
