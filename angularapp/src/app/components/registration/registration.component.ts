import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = {
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: ''
  };
  validationErrors: string[] = [];
  confirmPassword: string = '';
  errorMessage: string = '';
  // Manager key14  
  managerKey: string = '';  
  private readonly validManagerKey = 'MANAGER123';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.errorMessage = '';
    this.validationErrors = []; 
    this.user.Username=this.user.Username.trim();
    // Validate manager   
    if (this.user.UserRole === 'Manager' &&  this.managerKey !== this.validManagerKey) 
    {
      this.validationErrors.push('Invalid Manager Registration Key');   
      return;    
    }

    this.authService.register(this.user).subscribe({
      next: () => {
        // Navigate to login on success
        this.router.navigate(['/login']);
      },
      // error: (err) => {
      //   // Show "User already exists" if backend returns conflict
      //   if (err.status === 409 || (err.error && err.error.message)) {
      //     this.errorMessage = err.error.message || 'User already exists';
      //   } else {
      //     this.errorMessage = 'Registration failed. Please try again.';
      //   }
      // }
      

        error: (err) => {

          this.validationErrors = [];

          if (err.error?.errors) {

            Object.keys(err.error.errors).forEach(key => {
              this.validationErrors.push(...err.error.errors[key]);
            });

          } else if (err.error?.message) {

            this.validationErrors.push(err.error.message);

          } else {

            this.validationErrors.push('Registration failed. Please try again.');

          }
        }
      
    });
  }
}