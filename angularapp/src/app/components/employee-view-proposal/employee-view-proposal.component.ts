import { Component, OnInit } from '@angular/core';
import { ProjectProposalService } from '../../services/project-proposal.service';
import { ProjectProposal } from '../../models/projectProposal.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-view-proposal',
  templateUrl: './employee-view-proposal.component.html',
  styleUrls: ['./employee-view-proposal.component.css']
})
// export class EmployeeViewProposalComponent implements OnInit {
//   proposals: ProjectProposal[] = [];
//   showDeleteModal: boolean = false;
//   proposalToDelete: number | null = null;
//   dataloaded:boolean=false;
//   constructor(private proposalService: ProjectProposalService, private router:Router) { }

//   ngOnInit(): void {
//     this.loadProposals();
//   }

//   loadProposals(): void {
//     const userId = localStorage.getItem('userId');

//     if (!userId) {
//       this.proposals = [];
//       return;
//     }

//     this.proposalService.getProjectProposalsByUserId(+userId).subscribe({
//       next: (data) => {
//         console.log('Loaded proposals:', data);
//         this.proposals = data;
//         this.dataloaded=true;
//       },
//       error: (err) => {
//         console.log('Load proposals error:', err);
//         this.proposals = [];
//         this.dataloaded=true;
//       }
//     });
//   }

//   confirmDelete(proposalId: number): void {
//     this.proposalToDelete = proposalId;
//     this.showDeleteModal = true;
//   }

//   deleteProposal(): void {
//     if (this.proposalToDelete === null) {
//       return;
//     }

//     const deletedId = this.proposalToDelete;

//     this.proposalService.deleteProjectProposal(deletedId).subscribe({
//       next: (data) => {
//         console.log('Deleted Successfully:', data);
//         this.showDeleteModal = false;
//         this.proposalToDelete = null;
//         this.loadProposals();
//       },
//       error: (err) => {
//         console.log('Delete Error:', err);

//         this.showDeleteModal = false;
//         this.proposalToDelete = null;
//       }
//     });
//   }

//   cancelDelete(): void {
//     this.showDeleteModal = false;
//     this.proposalToDelete = null;
//   }
// }
export class EmployeeViewProposalComponent implements OnInit {
  proposals: ProjectProposal[] = [];

  showDeleteModal: boolean = false;
  proposalToDelete: number | null = null;
  dataloaded: boolean = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private proposalService: ProjectProposalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProposals();
  }

  loadProposals(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.proposals = [];
      return;
    }

    this.proposalService.getProjectProposalsByUserId(+userId).subscribe({
      next: (data) => {
        this.proposals = data;
        this.dataloaded = true;
        this.currentPage = 1; // reset page after load
      },
      error: (err) => {
        console.log(err);
        this.proposals = [];
        this.dataloaded = true;
      }
    });
  }

  // Pagination methods
  get paginatedProposals(): ProjectProposal[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.proposals.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {
    return Math.ceil(this.proposals.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get pageNumbers(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  confirmDelete(proposalId: number): void {
    this.proposalToDelete = proposalId;
    this.showDeleteModal = true;
  }

  deleteProposal(): void {
    if (this.proposalToDelete === null) return;

    const deletedId = this.proposalToDelete;

    this.proposalService.deleteProjectProposal(deletedId).subscribe({
      next: () => {

        // Remove deleted item immediately
        this.proposals = this.proposals.filter(
          p => p.proposalId !== deletedId
        );

        // Handle last page deletion
        if (
          this.currentPage > this.totalPages &&
          this.currentPage > 1
        ) {
          this.currentPage--;
        }

        this.showDeleteModal = false;
        this.proposalToDelete = null;
      },
      error: (err) => {
        console.log(err);
        this.showDeleteModal = false;
        this.proposalToDelete = null;
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.proposalToDelete = null;
  }
}