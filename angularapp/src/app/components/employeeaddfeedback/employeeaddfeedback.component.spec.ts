import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmployeeaddfeedbackComponent } from './employeeaddfeedback.component';

describe('EmployeeaddfeedbackComponent', () => {
  let component: EmployeeaddfeedbackComponent;
  let fixture: ComponentFixture<EmployeeaddfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ EmployeeaddfeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeaddfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_employeeaddfeedback_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_add_feedback_heading_in_the_employeeaddfeedback_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Add Feedback');
  });
});
