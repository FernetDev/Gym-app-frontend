import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:  [ReactiveFormsModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatButtonModule,
     NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  myForm! : FormGroup;

constructor(private fb: FormBuilder){}
ngOnInit(): void {
  this.myForm = this.fb.group({
    name: [
      '', 
      [Validators.required, Validators.pattern('^[a-zA-Z ]+$')] // Solo letras y espacios
    ],
    price: [
      '', 
      [Validators.required, Validators.pattern('^[0-9]+$')] // Solo números
    ],
    dateOfJoin: ['', [Validators.required]],
    contactNo: [
      '',
      [Validators.required, Validators.pattern('^[0-9]{10}$')] // Solo números y de longitud 10
    ],
    email: [
      '', 
      [Validators.required, Validators.email] // Validación de formato de email
    ],
  });
}

onSubmit() {
  if (this.myForm.valid) {
    console.log("Form submitted", this.myForm.value);
  } else {
    console.log("Invalid form", this.myForm.value);
    this.myForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
  }
}
//metodo para resetear el form
onCancel(): void {
  this.myForm.reset(); // Restablece todos los campos del formulario
}


  
}