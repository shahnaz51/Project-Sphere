import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-employeeviewfeedback',
  templateUrl: './employeeviewfeedback.component.html',
  styleUrls: ['./employeeviewfeedback.component.css']
})

export class EmployeeviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  showDeleteModal: boolean = false;
  feedbackToDelete: number | null = null;
  dataloaded: boolean = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) return;

    this.feedbackService.getAllFeedbacksByUserId(userId).subscribe({
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

  // Pagination Methods

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

  confirmDelete(feedbackId: number): void {
    this.feedbackToDelete = feedbackId;
    this.showDeleteModal = true;
  }

  deleteFeedback(): void {
    if (this.feedbackToDelete === null) return;

    const deletedId = this.feedbackToDelete;

    this.feedbackService
      .deleteFeedback(deletedId.toString())
      .subscribe({
        next: () => {

          this.feedbacks = this.feedbacks.filter(
            f => f.feedbackId !== deletedId
          );

          if (
            this.currentPage > this.totalPages &&
            this.currentPage > 1
          ) {
            this.currentPage--;
          }

          this.showDeleteModal = false;
          this.feedbackToDelete = null;
        },
        error: () => {
          this.showDeleteModal = false;
          this.feedbackToDelete = null;
        }
      });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.feedbackToDelete = null;
  }
}

