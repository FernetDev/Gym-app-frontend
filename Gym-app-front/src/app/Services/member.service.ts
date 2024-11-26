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


  actualizarPago(member: any): Observable<any> {
    return this.http.put(`${this.baseUrl}Cliente/editar`, member);
  }
}
