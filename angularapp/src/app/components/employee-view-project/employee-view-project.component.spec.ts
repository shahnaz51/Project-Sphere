import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmployeeViewProjectComponent } from './employee-view-project.component';

describe('EmployeeViewProjectComponent', () => {
  let component: EmployeeViewProjectComponent;
  let fixture: ComponentFixture<EmployeeViewProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ EmployeeViewProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_employee_view_project_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_projects_heading_in_the_employee_view_project_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Projects');
  });
});
