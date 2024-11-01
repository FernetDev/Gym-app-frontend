import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, MatListModule,RouterLinkActive, RouterLink,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
