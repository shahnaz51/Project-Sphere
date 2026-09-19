// import { Component,OnInit } from '@angular/core';
// import { AuthService } from './services/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent  {
//   v:boolean=true;
//   title="angularapp";
//   role:string='';
//   ngOnInit(){
//     this.getRole();
//   }
//   getRole(): void {
//     const token = localStorage.getItem('token');
//     this.v = !!token;
//     if (!token) {
//       return null;
//     }
  
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     this.role=payload.role;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title='angularapp';
  isLoggedIn = false;
  role = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole();

    // Listen for role changes after login/logout
    this.authService.userRole$.subscribe(role => {
      this.role = role;
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }
}