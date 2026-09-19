import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-employee-view-project',
  templateUrl: './employee-view-project.component.html',
  styleUrls: ['./employee-view-project.component.css']
})

export class EmployeeViewProjectComponent implements OnInit {

  projects: Project[] = [];
  dataloaded: boolean = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.currentPage = 1;
        this.dataloaded = true;
      },
      error: () => {
        this.projects = [];
        this.dataloaded = true;
      }
    });
  }

  // Pagination
  get paginatedProjects(): Project[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    return this.projects.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages(): number {
    return Math.ceil(this.projects.length / this.itemsPerPage);
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