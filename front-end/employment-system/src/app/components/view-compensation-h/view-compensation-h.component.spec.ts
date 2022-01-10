import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompensationHComponent } from './view-compensation-h.component';

describe('ViewCompensationHComponent', () => {
  let component: ViewCompensationHComponent;
  let fixture: ComponentFixture<ViewCompensationHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompensationHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompensationHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
