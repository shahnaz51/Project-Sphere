import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-manager-edit-project',
  templateUrl: './manager-edit-project.component.html',
  styleUrls: ['./manager-edit-project.component.css']
})
export class ManagerEditProjectComponent implements OnInit {
  projectId: number = 0;
  project: Project = {
    projectTitle: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    frontEndTechStack: '',
    backendTechStack: '',
    database: '',
    status: 'Pending' 
  };
  validationErrors:string[]=[];
  showSuccessModal: boolean = false;
  errorMessage: string = '';
  formSubmitted: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.params['id'];
    this.loadProject();
  }

  loadProject(): void {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (data) => {
        this.project = {
          ...data,
          startDate: this.formatDate(data.startDate),
          endDate: this.formatDate(data.endDate)
        };
      },
      error: (err) => {

        this.validationErrors = [];
      
        if (err.error?.errors) {
      
          Object.keys(err.error.errors).forEach(key => {
            this.validationErrors.push(...err.error.errors[key]);
          });
      
        } else if (err.error?.message) {
      
          this.validationErrors.push(err.error.message);
      
        } else {      
          this.validationErrors.push('Invalid email or password');      
        }
      }
    });
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toISOString().split('T')[0];
  }

  onSubmit(form: any): void {
    this.formSubmitted = true;
    this.errorMessage = '';
    this.project.projectTitle=this.project.projectTitle.trim();
    // this.project.projectDescription=this.project.projectDescription.trim();
    this.project.projectDescription = (this.project.projectDescription || '').trim();

    this.project.frontEndTechStack=this.project.frontEndTechStack.trim();
    this.project.backendTechStack=this.project.backendTechStack.trim();
    this.project.database=this.project.database.trim();
    if (form.invalid) return;

    this.projectService.updateProject(this.projectId, this.project).subscribe({
      next: () => {
        this.showSuccessModal = true;
      },
      error: (err) => {

        this.validationErrors = [];
      
        if (err.error?.errors) {
      
          Object.keys(err.error.errors).forEach(key => {
            this.validationErrors.push(...err.error.errors[key]);
          });
      
        } else if (err.error?.message) {
      
          this.validationErrors.push(err.error.message);
      
        } else {      
          this.validationErrors.push('Something went wrong while adding feedback');      
        }
      }
    });
  }

  closeModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/manager/view-project']);
  }
}