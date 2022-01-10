import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompensationBreakdownComponent } from './view-compensation-breakdown.component';

describe('ViewCompensationBreakdownComponent', () => {
  let component: ViewCompensationBreakdownComponent;
  let fixture: ComponentFixture<ViewCompensationBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompensationBreakdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompensationBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
