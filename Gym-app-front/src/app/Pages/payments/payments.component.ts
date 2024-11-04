import { Component } from '@angular/core';
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInput, MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [ MatFormFieldModule,MatInputModule,MatLabel,MatInput],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {

}
