import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public readonly url : string = 'http://localhost:3000/usuarios';

  constructor(private httpClient: HttpClient) { }

  getUsuarios(): Observable<UsuarioModel[]>{
    return this.httpClient.get<UsuarioModel[]>(this.url);
  }

  getUsuario(id: number): Observable<UsuarioModel>{
    return this.httpClient.get<UsuarioModel>(`${this.url}/${id}`);
  }

  addUsuario(usuario: UsuarioModel): Observable<UsuarioModel>{
    return this.httpClient.post<UsuarioModel>(this.url, usuario);
  }

  updateUsuario(usuario: UsuarioModel, id: number): Observable<UsuarioModel>{
    return this.httpClient.put<UsuarioModel>(`${this.url}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<UsuarioModel>{
    return this.httpClient.delete<UsuarioModel>(`${this.url}/${id}`);
  }
}
