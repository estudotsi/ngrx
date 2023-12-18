import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsuarioService } from "src/app/repository/usuario.service";
import * as fromUsuariosAction from './usuarios.actions';
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()

export class UsuariosEffects{

  constructor(private actions$: Actions,
              private usuarioService: UsuarioService){}

  loadUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeActions.LOAD_USUARIOS),
      exhaustMap(() => this.usuarioService.getUsuarios()
      .pipe(
        map(payload =>
            fromUsuariosAction.LoadUsuariosSuccess({payload}),
            catchError(error => of(fromUsuariosAction.LoadUsuariosFail({ error })))
           )
      ))
    )
  )

  loadUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeActions.LOAD_USUARIO),
      exhaustMap((record: any) => this.usuarioService.getUsuario(record.payload)
      .pipe(
        map(payload =>
            fromUsuariosAction.LoadUsuarioSuccess({payload}),
            catchError(error => of(fromUsuariosAction.LoadUsuarioFail({ error })))
           )
      ))
    )
  )

  creatUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeActions.CREATE_USUARIO),
      exhaustMap((record: any) => this.usuarioService.addUsuario(record.payload)
      .pipe(
        map(payload =>
            fromUsuariosAction.CreateUsuarioSucces({payload}),
            catchError(error => of(fromUsuariosAction.CreateUsuarioFail({ error })))
           )
      ))
    )
  )

  updateUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeActions.UPDATE_USUARIO),
      exhaustMap((record: any) => this.usuarioService.updateUsuario(record.payload, record)
      .pipe(
        map(payload =>
            fromUsuariosAction.CreateUsuarioSucces({payload}),
            catchError(error => of(fromUsuariosAction.UpdateUsuarioFail({ error })))
           )
      ))
    )
  )

  deleteUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(fromUsuariosAction.usuariosTypeActions.DELETE_USUARIO),
      exhaustMap((record: any) => this.usuarioService.deleteUsuario(record.payload)
      .pipe(
        map(() =>
            fromUsuariosAction.DeleteUsuarioSuccess({payload: record.payload}),
            catchError(error => of(fromUsuariosAction.DeleteUsuarioFail({ error })))
           )
      ))
    )
  )


}
