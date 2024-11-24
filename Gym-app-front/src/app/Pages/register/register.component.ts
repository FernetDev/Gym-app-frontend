import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Miembro } from '../../Interfaces/miembro';

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
    nombreCompleto: [
      '', 
      [Validators.required, Validators.pattern('^[a-zA-Z ]+$')] // Solo letras y espacios
    ],

    fechaIngreso: ['', [Validators.required]],
    contactNro: [
      '',
      [Validators.required, Validators.pattern('^[0-9]{10}$')] // Solo números y de longitud 10
    ],
    email: [
      '', 
      [Validators.required, Validators.email] // Validación de formato de email
    ],
    idPerfil: [
      '', 
      [Validators.required, ] 
    ],
  });
}



onSubmit() {
  if (this.myForm.valid) {
    const objeto:Miembro = {
      nombreCompleto:this.myForm.value.name ,
      email: this.myForm.value.email,
      contactNro: this.myForm.value.contactNro,
      idPerfil:this.myForm.value.idPerfil ,
      fechaIngreso: this.myForm.value.FechaIngreso,
    }

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