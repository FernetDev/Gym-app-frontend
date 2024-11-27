import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { Miembro } from '../Interfaces/miembro';

@Injectable({
  providedIn: 'root'
})
export class AddMemberService {
  private http = inject(HttpClient);
  private baseUrl:string = appsettings.apiUrl;
  
  constructor() { }


  registrarCliente(objeto:Miembro):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Cliente/guardar`, objeto,)
  }

  obtenerMiembros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Cliente/lista`);
  }

  listarMiembros(): Observable<Miembro[]> {
    return this.http.get<Miembro[]>(`${this.baseUrl}Cliente/lista`).pipe(
      retry(1),
      catchError((error) => {
        console.error('Error al listar miembros:', error);
        return throwError(() => new Error('Error al obtener los miembros.'));
      })
    );
  }

  actualizarPago(member: any): Observable<any> {
    return this.http.put(`${this.baseUrl}Cliente/editar`, member);
  }


  obtenerMiembroId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Cliente/buscar/${id}`);
  }

}