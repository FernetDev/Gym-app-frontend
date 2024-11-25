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
  { path: 'login', component: LoginComponent }, // Ruta de login sin canActivate
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirección a login si la ruta está vacía
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], children: [
      { path: 'principal', component: PrincipalComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'profile', component: ProfileComponent }
    ]},
];
