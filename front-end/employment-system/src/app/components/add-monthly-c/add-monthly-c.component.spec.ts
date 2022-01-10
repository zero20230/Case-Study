import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthlyCComponent } from './add-monthly-c.component';

describe('AddMonthlyCComponent', () => {
  let component: AddMonthlyCComponent;
  let fixture: ComponentFixture<AddMonthlyCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMonthlyCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMonthlyCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
