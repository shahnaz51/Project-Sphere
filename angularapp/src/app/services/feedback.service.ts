import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { ApiUrl } from '../environment/env';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  public apiUrl = ApiUrl.apiUrl;

  constructor(private http: HttpClient) { }

  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  // }

  // sendFeedback(feedback: Feedback): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/feedback`, feedback, { headers: this.getHeaders(),
  //     responseType: 'text'
  //   });
  // }

  sendFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/feedback`, feedback, {responseType: 'text'}); }

  getAllFeedbacksByUserId(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/user/${userId}`);
  }

  deleteFeedback(feedbackId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/feedback/${feedbackId}`);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`);
  }
}