import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public readonly url : string = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.url);
  }

  getUsuario(id: number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.url}/${id}`);
  }

  addUsuario(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.url, usuario);
  }

  updateUsuario(usuario: Usuario, id: number): Observable<Usuario>{
    return this.httpClient.put<Usuario>(`${this.url}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<Usuario>{
    return this.httpClient.delete<Usuario>(`${this.url}/${id}`);
  }
}
