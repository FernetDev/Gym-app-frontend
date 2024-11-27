import { NgFor, NgIf } from '@angular/common';
import { Component, inject  } from '@angular/core';
import { ReactiveFormsModule, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Miembro } from '../../Interfaces/miembro';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AddMemberService } from '../../Services/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
     MatAutocompleteModule,
     NgFor,
     
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  myForm! : FormGroup;
  private addMember = inject(AddMemberService);


  options = [
    { label: 'Básico', value: 1 },
    { label: 'Personalizado', value: 2 },
    { label: 'Powerlifter', value: 3 }
  ];
  

constructor(private fb: FormBuilder, private snackBar: MatSnackBar){}
ngOnInit(): void {
  this.myForm = this.fb.group({
    NombreCompleto: [
      '', 
      [Validators.required, Validators.pattern('^[a-zA-Z ]+$')] // Solo letras y espacios
    ],

    FechaIngreso: [new Date(), [Validators.required]],
    ContactNro: [
      '',
      [Validators.required] // Solo números y de longitud 10
    ],
    Email: [
      '', 
      [Validators.required, Validators.email] // Validación de formato de email
    ],
    IdPerfil: [
      '', 
      [Validators.required, ] 
    ],
  });
}


onSubmit() {
  if (this.myForm.valid) {
    var newMember: Miembro = {
      nombreCompleto: this.myForm.value.NombreCompleto,
      IdPerfil: this.myForm.value.IdPerfil,
      fechaIngreso: new Date(this.myForm.value.FechaIngreso).toISOString(),
      Email: this.myForm.value.Email,
      ContactNro: this.myForm.value.ContactNro,
      fechaPago: new Date(this.myForm.value.FechaIngreso).toISOString(),
      estaPagada: true,
      fechaVencimiento: new Date(
        new Date(this.myForm.value.FechaIngreso).setMonth(
          new Date(this.myForm.value.FechaIngreso).getMonth() + 1
        )
      ).toISOString(),
    };

    console.log('Formulario enviado: ', newMember);

    this.addMember.registrarCliente(newMember).subscribe(
      (data: any) => {
        console.log('Miembro registrado: ', data);
        this.snackBar.open('Cliente registrado exitosamente.', 'Cerrar', {
          duration: 4000, 
          panelClass: ['snack-success'], 
        });
        // Resetear el formulario
        this.onCancel();
      },
      (error: any) => {
        console.error('Error al registrar miembro: ', error);
        this.snackBar.open('Ocurrió un error al registrar el cliente. Intenta nuevamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['snack-error'], 
        });
      }
    );
  } else {
    this.snackBar.open('Por favor, corrige los campos antes de enviar.', 'Cerrar', {
      duration: 3000,
      panelClass: ['snack-warning'], 
    });
  }
}

//metodo para resetear el form
onCancel(): void {
  this.myForm.reset(); // Restablece todos los campos del formulario
}  
}