import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeeaddfeedback',
  templateUrl: './employeeaddfeedback.component.html',
  styleUrls: ['./employeeaddfeedback.component.css']
})
export class EmployeeaddfeedbackComponent implements OnInit {
  feedback: Feedback = {
    feedbackId : 0,
    userId: 0,
    feedbackText: '',
    date: new Date()
  };
  validationErrors:string[]=[];

  showSuccessModal: boolean = false;
  errorMessage: string = '';

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    this.feedback.userId = userId ? +userId : 0;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.feedback.date = new Date();
    this.feedback.feedbackText=this.feedback.feedbackText.trim();
    this.feedbackService.sendFeedback(this.feedback).subscribe({
      next: () => {
        this.showSuccessModal = true;
      },
      error: (err) => {
        this.validationErrors = [];
        this.errorMessage = '';

        let errorBody = err.error;
      
        // If backend sends error as string, convert it to JSON
        if (typeof errorBody === 'string') {
          try {
            errorBody = JSON.parse(errorBody);
          } catch {
            this.validationErrors.push(errorBody);
            return;
          }
        }
      
        if (errorBody?.errors) {
          Object.keys(errorBody.errors).forEach(key => {
            this.validationErrors.push(...errorBody.errors[key]);
          });
        } 
        else if (errorBody?.message) {
          this.validationErrors.push(errorBody.message);
        } 
        else if (errorBody?.title) {
          this.validationErrors.push(errorBody.title);
        } 
        else {
          this.validationErrors.push('Something went wrong while adding feedback');
        }
      }
    });
  }

  closeModal(): void {
    this.showSuccessModal = false;
    this.feedback = {
      feedbackId : 0,
      userId: this.feedback.userId,
      feedbackText: '',
      date: new Date()
    };
    this.router.navigate(['/employee/view-feedback']);
  }
}