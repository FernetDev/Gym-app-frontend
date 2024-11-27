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

  registrarCliente(objeto: Miembro): Observable<any> {
    return this.http.post(`${this.baseUrl}Cliente/guardar`, objeto, { responseType: 'text' as 'json' });
  }


  obtenerMiembros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Cliente/lista`);
  }


  actualizarPago(member: any): Observable<any> {
    return this.http.put(`${this.baseUrl}Cliente/editar`, member);

  }
  listarMiembros(): Observable<Miembro[]> {
    return this.http.get<Miembro[]>(`${this.baseUrl}Cliente/listar`).pipe(
      retry(1),
      catchError((error) => {
        console.error('Error al listar miembros:', error);
        return throwError(() => new Error('Error al obtener los miembros.'));
      })
    );
  }
  
   actualizarMiembro(idCliente: number, miembro: Miembro): Observable<Miembro> {
    return this.http.put<Miembro>(`${this.baseUrl}Cliente/actualizar/${idCliente}`, miembro).pipe(
      catchError((error) => {
        console.error('Error al actualizar miembro:', error); // Ver más detalles del error
        return throwError(() => new Error('Error al actualizar el miembro.'));
      })
    );
  }

}
