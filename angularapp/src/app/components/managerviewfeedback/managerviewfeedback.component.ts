import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];                                           
  showProfileModal: boolean = false;                                    
  selectedUser: any = null;  
  dataloaded:boolean=false;        
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;                                   

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.currentPage = 1;
        this.dataloaded = true;
      },
      error: () => {
        this.feedbacks = [];
        this.dataloaded = true;
      }
    });
  }

  showProfile(feedback: Feedback): void {
    // alert('Button Clicked');
    this.selectedUser = (feedback as any).user || {
      username: 'N/A',
      email: 'N/A',
      mobileNumber: 'N/A',
      userRole: 'N/A'
    };
    this.showProfileModal = true;
  }

  closeProfile(): void {
    this.showProfileModal = false;
    this.selectedUser = null;
  }
  get paginatedFeedbacks(): Feedback[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  
    return this.feedbacks.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
  
  get totalPages(): number {
    return Math.ceil(this.feedbacks.length / this.itemsPerPage);
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
