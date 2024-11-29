import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { PaymentsComponent } from './Pages/payments/payments.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], children: [
      { path: 'members', component: PrincipalComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'profile/:id', component: ProfileComponent },
    ]},
];
