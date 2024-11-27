import { Component, inject } from '@angular/core';
import { AccesoService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../Interfaces/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public myForm = inject(FormBuilder);
  
constructor(private snackBar: MatSnackBar){}

  //Formulario para Iniciar
  public formRegistro: FormGroup = this.myForm.group({
    nombre:['',Validators.required],
    correo:['',Validators.required],
    clave:['',Validators.required]
  });

  //Metodo para Registrarse
  registrarse(){
    if(this.formRegistro.invalid){
      console.log("invalid")
    }

    const objeto:Usuario = {
      nombre: this.formRegistro.value.nombre,
      correo: this.formRegistro.value.correo,
      clave: this.formRegistro.value.clave
    }

      this.accesoService.registrarse(objeto).subscribe({
        next: (data) =>{
          if(data.isSuccess){
            this.snackBar.open('Admin registrado exitosamente.', 'Cerrar', {
              duration: 4000, 
              panelClass: ['snack-success'], 
            });
          }else{
            alert("No se pudo Registrar")
          }
        }, error:(error)=>{
          console.log(error.message);
        }
    })
  }

  

  volver(){
    this.router.navigate([''])
  }
}