import { Component, inject, } from '@angular/core';
import { AccesoService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../Interfaces/login';
import { ResponseAcceso } from '../../Interfaces/response-acceso';
//importo lo que voy a usar en la logica
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//Angular Material
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuil = inject(FormBuilder);
  
  constructor(private snackBar: MatSnackBar){}

  //Formulario para Iniciar
  public formLogin: FormGroup = this.formBuil.group({
    correo:['',Validators.required, Validators.email],
    clave:['',Validators.required]
  });

  //Metodo para Iniciar Sesion
  iniciarSesion(){
    if(this.formLogin.invalid)return;
    
    const objeto:Login = {
      correo: this.formLogin.value.correo,
      clave: this.formLogin.value.clave
    }
    

    this.accesoService.login(objeto).subscribe({
      next: (data: ResponseAcceso) => { // Usa la interfaz correcta
        if (data.isSuccess) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user)); // Aquí se almacena correctamente el user

    
          this.router.navigate(['/dashboard/members']); // Redirige al dashboard
        } else {
          this.snackBar.open('Email or Password incorrect.', 'Cerrar'), {
            duration: 4000, 
            panelClass: ['snack-error'],
          }
        }
      },
      error: (error) => {
        console.error('Error en la solicitud de login:', error); // Mejor manejo de errores
        alert("Error al intentar iniciar sesión.");
      }
    });
    
  }

  //Metodo para Registro
  registrarse(){
    this.router.navigate(['registro']); //Redirige a registro
  }

  onForgotPassword() {
    this.router.navigate(['forgot-password']); // Redirige a forgot-password
  }

}