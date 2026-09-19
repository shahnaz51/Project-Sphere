
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerAddProjectComponent } from './components/manager-add-project/manager-add-project.component';
import { ManagerViewProjectComponent } from './components/manager-view-project/manager-view-project.component';
import { ManagerEditProjectComponent } from './components/manager-edit-project/manager-edit-project.component';
import { ManagerViewProposalComponent } from './components/manager-view-proposal/manager-view-proposal.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';


import { EmployeenavComponent } from './components/employeenav/employeenav.component';
import { EmployeeAddProposalComponent } from './components/employee-add-proposal/employee-add-proposal.component';
import { EmployeeViewProposalComponent } from './components/employee-view-proposal/employee-view-proposal.component';
import { EmployeeViewProjectComponent } from './components/employee-view-project/employee-view-project.component';
import { EmployeeaddfeedbackComponent } from './components/employeeaddfeedback/employeeaddfeedback.component';
import { EmployeeviewfeedbackComponent } from './components/employeeviewfeedback/employeeviewfeedback.component';


import { AuthGuard } from './components/authguard/auth.guard';
const routes: Routes = [

  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegistrationComponent },
  // { path: 'home', component: HomeComponent },

  // { path: 'manager', component: ManagernavComponent, canActivate: [AuthGuard] },
  // { path: 'manager/add-project', component: ManagerAddProjectComponent, canActivate: [AuthGuard] },
  // { path: 'manager/view-project', component: ManagerViewProjectComponent, canActivate: [AuthGuard] },
  // { path: 'manager/edit-project/:id', component: ManagerEditProjectComponent, canActivate: [AuthGuard] },
  // { path: 'manager/view-proposal', component: ManagerViewProposalComponent, canActivate: [AuthGuard] },
  // { path: 'manager/view-feedback', component: ManagerviewfeedbackComponent, canActivate: [AuthGuard] },

  // { path: 'employee', component: EmployeenavComponent, canActivate: [AuthGuard] },
  // { path: 'employee/add-proposal', component: EmployeeAddProposalComponent, canActivate: [AuthGuard] },
  // { path: 'employee/view-proposal', component: EmployeeViewProposalComponent, canActivate: [AuthGuard] },
  // { path: 'employee/view-project', component: EmployeeViewProjectComponent, canActivate: [AuthGuard] },
  // { path: 'employee/add-feedback', component: EmployeeaddfeedbackComponent, canActivate: [AuthGuard] },
  // { path: 'employee/view-feedback', component: EmployeeviewfeedbackComponent, canActivate: [AuthGuard] },

  // { path: 'error', component: ErrorComponent },
  // { path: '**', redirectTo: '/error' }



    { path: '', redirectTo: '/login', pathMatch: 'full' },
  
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'home', component: HomeComponent },
  
    {
      path: 'manager',
      component: HomeComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Manager'] }
    },
    {
      path: 'manager/add-project',
      component: ManagerAddProjectComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Manager'] }
    },    
    {
      path: 'manager/view-project',
      component: ManagerViewProjectComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Manager'] }
    },
    {
      path: 'manager/edit-project/:id',
      component: ManagerEditProjectComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Manager'] }
    },
    {
      path: 'manager/view-proposal',
      component: ManagerViewProposalComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Manager'] }
    },
    {
      path: 'manager/view-feedback',
      component: ManagerviewfeedbackComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Manager'] }
    },
  
    {
      path: 'employee',
      component: HomeComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Employee'] }
    },
    {
      path: 'employee/add-proposal',
      component: EmployeeAddProposalComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Employee'] }
    },
    {
      path: 'employee/view-proposal',
      component: EmployeeViewProposalComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Employee'] }
    },
    {
      path: 'employee/view-project',
      component: EmployeeViewProjectComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Employee'] }
    },
    {
      path: 'employee/add-feedback',
      component: EmployeeaddfeedbackComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Employee'] }
    },
    {
      path: 'employee/view-feedback',
      component: EmployeeviewfeedbackComponent,
      canActivate: [AuthGuard],
      data: { roles: ['Employee'] }
    },
  
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error' }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

