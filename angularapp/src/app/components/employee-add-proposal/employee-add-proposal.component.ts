import { Component } from '@angular/core';
import { ProjectProposalService } from '../../services/project-proposal.service';
import { ProjectProposal } from '../../models/projectProposal.model';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-employee-add-proposal',
  templateUrl: './employee-add-proposal.component.html',
  styleUrls: ['./employee-add-proposal.component.css']
})
export class EmployeeAddProposalComponent {
  proposal: ProjectProposal = {
    userId: 0,
    proposalTitle: '',
    proposalDescription: '',
    status: 'Pending'                                                   
  };
  validationErrors:string[]=[];

  showSuccessModal: boolean = false;                                   
  errorMessage: string = '';

  constructor(private proposalService: ProjectProposalService,private router:Router) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.proposal.userId = userId ? +userId : 0;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.proposal.proposalTitle=this.proposal.proposalTitle.trim();
    this.proposal.proposalDescription=this.proposal.proposalDescription.trim();

    this.proposalService.addProjectProposal(this.proposal).subscribe({
      next: () => {
        this.showSuccessModal = true;                                      
      },
      error: (err) => {

        this.validationErrors = [];
      
        if (err.error?.errors) {
      
          Object.keys(err.error.errors).forEach(key => {
            this.validationErrors.push(...err.error.errors[key]);
          });
      
        } else if (err.error?.message) {
      
          this.validationErrors.push(err.error.message);
      
        } else {      
          this.validationErrors.push('Invalid email or password');      
        }
      }
    });
  }

  closeModal(): void {
    this.showSuccessModal = false;
    
    this.proposal = {
      userId: this.proposal.userId,
      proposalTitle: '',
      proposalDescription: '',
      status: 'Pending'
    };
    this.router.navigate(['employee/view-proposal']);
  }
}
