import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedComplainComponent } from './resolved-complain.component';

describe('ResolvedComplainComponent', () => {
  let component: ResolvedComplainComponent;
  let fixture: ComponentFixture<ResolvedComplainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolvedComplainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
