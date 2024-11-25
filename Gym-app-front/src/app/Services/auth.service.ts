import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../Interfaces/response-acceso';
import { Usuario } from '../Interfaces/usuario';
import { Login } from '../Interfaces/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private http = inject(HttpClient);
  private baseUrl:string = appsettings.apiUrl;

  constructor(private router: Router) { }

// Conexion Registro y Login
  registrarse(objeto:Usuario):Observable<ResponseAcceso>{
    return this.http.post<ResponseAcceso>(`${this.baseUrl}Acceso/Registrarse`, objeto)
  }

  registrarCliente(objeto:Usuario):Observable<ResponseAcceso>{
    return this.http.post<ResponseAcceso>(`${this.baseUrl}Cliente/guardar`, objeto)
  }

  login(objeto:Login):Observable<ResponseAcceso>{
    return this.http.post<ResponseAcceso>(`${this.baseUrl}Acceso/Login`, objeto)
  }

  logout() {
    // Elimina el token del almacenamiento (localStorage o sessionStorage)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirige a la página de login
    this.router.navigate(['/login']);
  }

  
  //Validacion del Token
    validarToken(token:string):Observable<ResponseAcceso>{
    return this.http.get<ResponseAcceso>(`${this.baseUrl}Acceso/ValidarToken?token=${token}`)
  }
}