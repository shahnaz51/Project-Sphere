import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.css']
})
export class ManagernavComponent implements OnInit {
  username: string = '';                                                
  userRole: string = '';                                                
  showLogoutModal: boolean = false;                                     

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || 'Manager';
    this.userRole = localStorage.getItem('userRole') || 'Manager';
  }

  confirmLogout(): void {
    this.showLogoutModal = true;
  }

  
  logout(): void {
    this.authService.logout();                                          
    this.showLogoutModal = false;
    this.router.navigate(['/login']);                                  
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }
}


