import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewModalComponent } from './employee-view-modal.component';

describe('EmployeeViewModalComponent', () => {
  let component: EmployeeViewModalComponent;
  let fixture: ComponentFixture<EmployeeViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeViewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
