import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/repository/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios?: UsuarioModel[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
   this.carregarUsuarios();
  }

  public carregarUsuarios(): void{
    this.usuarioService.getUsuarios().subscribe({
      next: (usuariosRecebidos: UsuarioModel[]) => {
        this.usuarios = usuariosRecebidos;
      },
      error: (error: any) => {
        console.error("Erro: ", error);
      },
      complete: () => console.log("Completou")
    });
  }
}
