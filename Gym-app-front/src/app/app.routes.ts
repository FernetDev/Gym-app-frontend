import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PrincipalComponent } from './Pages/principal/principal.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { PaymentsComponent } from './Pages/payments/payments.component';
import { ProfileComponent } from './Pages/profile/profile.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'principal', component: PrincipalComponent },
        { path: 'admin', component: AdminComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'payments', component: PaymentsComponent },
        {path: 'profile', component: ProfileComponent}
      ]},
      { path: '', redirectTo: '/dashboard/principal', pathMatch: 'full' }
];