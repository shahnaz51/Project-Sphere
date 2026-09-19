import { TestBed } from '@angular/core/testing';

import { ProjectProposalService } from './project-proposal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectProposalService', () => {
  let service: ProjectProposalService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule],});
    service = TestBed.inject(ProjectProposalService);
  });

  fit('Frontend_should_create_project_proposal_service', () => {
    expect(service).toBeTruthy();
  });
});
