import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { ApiUrl } from '../environment/env';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public apiUrl = ApiUrl.apiUrl;

  constructor(private http: HttpClient) { }

  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  // }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/api/projects`);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/api/projects/${projectId}`);
  }

  addProject(project: Project): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/projects`, project);
  }

  updateProject(projectId: number, project: Project): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/projects/${projectId}`, project);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/projects/${projectId}`);
  }
}