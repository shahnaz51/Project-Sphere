import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectProposal } from '../models/projectProposal.model';
import { ApiUrl } from '../environment/env';

@Injectable({
  providedIn: 'root'
})
export class ProjectProposalService {
  public apiUrl = ApiUrl.apiUrl;

  constructor(private http: HttpClient) { }

  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  // }

  getAllProjectProposals(): Observable<ProjectProposal[]> {
    return this.http.get<ProjectProposal[]>(`${this.apiUrl}/api/projectproposals`);
  }

  getProjectProposalById(proposalId: number): Observable<ProjectProposal> {
    return this.http.get<ProjectProposal>(`${this.apiUrl}/api/projectproposals/${proposalId}`);
  }

  getProjectProposalsByUserId(userId: number): Observable<ProjectProposal[]> {
    return this.http.get<ProjectProposal[]>(`${this.apiUrl}/api/projectproposals/user/${userId}`);
  }

  addProjectProposal(projectProposal: ProjectProposal): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/projectproposals`, projectProposal);
  }

  updateProjectProposal(proposalId: number, projectProposal: ProjectProposal): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/projectproposals/${proposalId}`, projectProposal);
  }

  deleteProjectProposal(proposalId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/projectproposals/${proposalId}`);
  }
}