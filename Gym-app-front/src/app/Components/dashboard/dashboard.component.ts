import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, MatListModule,RouterLinkActive, RouterLink, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
