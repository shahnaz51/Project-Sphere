import { Component, OnInit } from '@angular/core';
import { ProjectProposalService } from '../../services/project-proposal.service';
import { ProjectProposal } from '../../models/projectProposal.model';

@Component({
  selector: 'app-manager-view-proposal',
  templateUrl: './manager-view-proposal.component.html',
  styleUrls: ['./manager-view-proposal.component.css']
})
export class ManagerViewProposalComponent implements OnInit {
  proposals: ProjectProposal[] = [];
  dataloaded:boolean=false;
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private proposalService: ProjectProposalService) { }

  ngOnInit(): void {
    this.loadProposals();
  }

  loadProposals(): void {
    this.proposalService.getAllProjectProposals().subscribe({
      next: (data) => {
        this.proposals = data;
        this.currentPage = 1;
        this.dataloaded = true;
      },
      error: () => {
        this.proposals = [];
        this.dataloaded = true;
      }
    });
  }

  approveProposal(proposal: ProjectProposal): void {
    this.updateStatus(proposal, 'Approved');
  }

  rejectProposal(proposal: ProjectProposal): void {
    this.updateStatus(proposal, 'Rejected');
  }

  private updateStatus(proposal: ProjectProposal, newStatus: string): void {
    const updated: ProjectProposal = { ...proposal, status: newStatus };

    this.proposalService.updateProjectProposal(proposal.proposalId!, updated).subscribe({
      next: () => {
        this.loadProposals();
      },
      error: () => {
      }
    });
  }
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
  
  get pageNumbers(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
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
}