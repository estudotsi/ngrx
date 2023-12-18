import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { error } from 'console';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/repository/usuario.service';
import { AppState } from 'src/app/store/app-state';
import * as fromUsuariosAction from "../../store/usuarios/usuarios.actions";
import * as fromUsuariosSelector from "../../store/usuarios/usuarios.reducer"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios$: Observable<UsuarioModel[]> = this.store.select(fromUsuariosSelector.getUsuarios);
  constructor(private usuarioService: UsuarioService,
              private store: Store<AppState>
             ) { }

  ngOnInit(): void {
    this.store.dispatch(fromUsuariosAction.LoadUsuarios());
   //this.carregarUsuarios();
  }

  /*public carregarUsuarios(): void{
    this.usuarioService.getUsuarios().subscribe({
      next: (usuariosRecebidos: UsuarioModel[]) => {
        this.usuarios = usuariosRecebidos;
      },
      error: (error: any) => {
        console.error("Erro: ", error);
      },
      complete: () => console.log("Completou")
    });
  }*/
}
