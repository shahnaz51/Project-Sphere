import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmployeeAddProposalComponent } from './employee-add-proposal.component';

describe('EmployeeAddProposalComponent', () => {
  let component: EmployeeAddProposalComponent;
  let fixture: ComponentFixture<EmployeeAddProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ EmployeeAddProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_employee_add_proposal_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_add_proposal_heading_in_the_employee_add_proposal_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Add Proposal');
  });
});
