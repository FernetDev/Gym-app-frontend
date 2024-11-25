import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AccesoService } from '../../Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, MatListModule,RouterLinkActive, RouterLink,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public user: { id: number; name: string; email: string } | null = null;

  constructor(private accesoService: AccesoService, private router: Router) {}
  ngOnInit(): void {
    // Recuperar el usuario desde localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData); // Convertir el string JSON a un objeto
    }
  }

  onLogout() {
    this.accesoService.logout(); // Llama al método de logout en el servicio
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
