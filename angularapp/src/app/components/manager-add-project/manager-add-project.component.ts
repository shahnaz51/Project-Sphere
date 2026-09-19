import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-add-project',
  templateUrl: './manager-add-project.component.html',
  styleUrls: ['./manager-add-project.component.css']
})

export class ManagerAddProjectComponent {
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

  constructor(private projectService: ProjectService,private router:Router) { }

  onSubmit(form: any): void {
    this.formSubmitted = true;                                          
    this.errorMessage = '';
    this.project.projectTitle=this.project.projectTitle.trim();
    // this.project.projectDescription=this.project.projectDescription.trim();
    this.project.projectDescription = (this.project.projectDescription || '').trim();
    this.project.frontEndTechStack=this.project.frontEndTechStack.trim();
    this.project.backendTechStack=this.project.backendTechStack.trim();
    this.project.database=this.project.database.trim();
    if (form.invalid) {
      return;                                                           
    }

    if (this.isEndDateInvalid()) {
      this.errorMessage = 'End Date must be greater than Start Date';
      return;
    }

    this.projectService.addProject(this.project).subscribe({
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
      
        } else if (typeof err.error === 'string' && err.error) {

          this.validationErrors.push(err.error);

        } else {      
          this.validationErrors.push('Failed to add project. Please try again.');      
        }
      }
    });
  }

  closeModal(): void {
    this.showSuccessModal = false;
    this.formSubmitted = false;
    // Reset form
    this.project = {
      projectTitle: '',
      projectDescription: '',
      startDate: '',
      endDate: '',
      frontEndTechStack: '',
      backendTechStack: '',
      database: '',
      status: 'Pending' 
    };
    this.router.navigate(['/manager/view-project']);
  }


  isEndDateInvalid(): boolean {
    if (!this.project.startDate || !this.project.endDate) {
      return false;
    }
  
    return new Date(this.project.endDate) <= new Date(this.project.startDate);
  }
}
