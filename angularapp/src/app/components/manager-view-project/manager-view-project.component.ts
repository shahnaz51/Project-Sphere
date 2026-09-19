import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-manager-view-project',
  templateUrl: './manager-view-project.component.html',
  styleUrls: ['./manager-view-project.component.css']
})
export class ManagerViewProjectComponent implements OnInit {
  projects: Project[] = [];                                             
  filteredProjects: Project[] = [];                                     
  searchTerm: string = '';  
  dataloaded:boolean=false;                                           

  showDeleteModal: boolean = false;
  projectToDelete: number | null = null;
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = data;
        this.currentPage = 1;
        this.dataloaded = true;
      },
      error: () => {
        this.projects = [];
        this.filteredProjects = [];
        this.dataloaded = true;
      }
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
  
    if (!term) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p =>
        p.projectTitle.toLowerCase().includes(term)
      );
    }
  
    this.currentPage = 1;
  }

 
  editProject(projectId: number): void {
    this.router.navigate(['/manager/edit-project', projectId]);
  }


  confirmDelete(projectId: number): void {
    this.projectToDelete = projectId;
    this.showDeleteModal = true;
  }


  deleteProject(): void {
    if (this.projectToDelete === null) return;
  
    const deletedId = this.projectToDelete;
  
    this.projectService.deleteProject(deletedId).subscribe({
      next: () => {
  
        this.projects = this.projects.filter(
          p => p.projectId !== deletedId
        );
  
        this.filteredProjects = this.filteredProjects.filter(
          p => p.projectId !== deletedId
        );
  
        if (
          this.currentPage > this.totalPages &&
          this.currentPage > 1
        ) {
          this.currentPage--;
        }
  
        this.showDeleteModal = false;
        this.projectToDelete = null;
      },
      error: () => {
        this.showDeleteModal = false;
        this.projectToDelete = null;
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.projectToDelete = null;
  }
  get paginatedProjects(): Project[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  
    return this.filteredProjects.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
  
  get totalPages(): number {
    return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
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
