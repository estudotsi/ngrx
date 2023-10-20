import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usario';
import { UsuarioService } from 'src/app/repository/usuario.service';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.css']
})
export class CadastroUsuariosComponent implements OnInit {

  model: Usuario = {id: 0, nome: '', idade: 0, perfil: ''};

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  addUsuario(){
    if(this.model.id === 0){
      //cadastra
      console.log("teste add", this.model.id);
      this.usuarioService.addUsuario(this.model).subscribe();
    }
    else{
      //atualiza
      console.log("Teste não add");

    }
  }

}
