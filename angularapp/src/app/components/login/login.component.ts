import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: Login = {
    Email: '',
    Password: ''
  };
  validationErrors: string[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.errorMessage = '';

    this.authService.login(this.login).subscribe({
      next: (response: any) => {
        // Get role from localStorage (set inside AuthService.login)
        const role = localStorage.getItem('userRole');

        // Navigate based on role
        if (role === 'Manager') {
          this.router.navigate(['/manager']);
        } else if (role === 'Employee') {
          this.router.navigate(['/employee']);
        } else {
          this.errorMessage = 'Unknown user role';
        }
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
}