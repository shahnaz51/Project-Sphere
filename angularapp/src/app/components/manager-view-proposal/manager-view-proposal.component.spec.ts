import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ManagerViewProposalComponent } from './manager-view-proposal.component';

describe('ManagerViewProposalComponent', () => {
  let component: ManagerViewProposalComponent;
  let fixture: ComponentFixture<ManagerViewProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ ManagerViewProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_manager_view_proposal_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_all_project_proposals_heading_in_the_manager_view_proposal_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('All Project Proposals');
  });
});
