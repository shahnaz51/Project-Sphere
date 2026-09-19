import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmployeeViewProposalComponent } from './employee-view-proposal.component';

describe('EmployeeViewProposalComponent', () => {
  let component: EmployeeViewProposalComponent;
  let fixture: ComponentFixture<EmployeeViewProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ EmployeeViewProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_employee_view_proposal_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_view_proposals_heading_in_the_employee_view_proposal_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('View Proposals');
  });
});
