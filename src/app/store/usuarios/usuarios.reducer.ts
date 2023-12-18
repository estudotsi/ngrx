import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { UsuarioModel } from "src/app/models/usuario.model";
import * as fromUsuariosAction from "../usuarios/usuarios.actions"
import { filter } from "rxjs";

export interface UsuarioState{
  usuarios: UsuarioModel[];
  usuario: UsuarioModel | null;
  error: string | '';

}

export const initialState: UsuarioState = {
  usuarios : [],
  usuario: null,
  error: ''
}

const _usuariosReducer = createReducer(
  initialState,
  on(fromUsuariosAction.LoadUsuariosSuccess, (state, {payload}) => ({...state,
                                                                        usuarios: payload,
                                                                        error: ''})),
  on(fromUsuariosAction.LoadUsuariosFail, (state, {error}) => ({...state,
                                                                   error: error})),

  on(fromUsuariosAction.LoadUsuarioSuccess, (state, {payload}) => ({...state,
                                                                       usuario: payload,
                                                                       error: ''})),
  on(fromUsuariosAction.LoadUsuarioFail, (state, {error}) => ({...state,
                                                                  error: error})),

  on(fromUsuariosAction.CreateUsuarioSucces, (state, {payload}) => ({...state,
                                                                        usuarios: [...state.usuarios, payload],
                                                                        error: ''})),
  on(fromUsuariosAction.CreateUsuarioFail, (state, {error}) => ({...state,
                                                                    error: error})),

  on(fromUsuariosAction.UpdateUsuarioSucces, (state, {payload}) => ({...state,
                                                                        usuarios: [...state.usuarios].map((row) => {
                                                                          if(row.id == payload.id){
                                                                            return payload;
                                                                          }
                                                                          else{
                                                                            return row;
                                                                          }
                                                                        }),
                                                                        error: ''})),
  on(fromUsuariosAction.UpdateUsuarioFail, (state, {error}) => ({...state, error: error})),

  on(fromUsuariosAction.DeleteUsuarioSuccess, (state, {payload}) => ({...state,
                                                                         usuarios: [...state.usuarios].filter((filter) => filter.id != payload),
                                                                         error: ''})),
  on(fromUsuariosAction.DeleteUsuarioFail, (state, {error}) => ({...state,
                                                                    error: error})),
)

export function usuariosReducer(state = initialState, action: Action){
  return _usuariosReducer(state, action);
}

const getUsuariosFeatureState = createFeatureSelector<UsuarioState>(
  'usuarios'
)

export const  getUsuarios = createSelector(
  getUsuariosFeatureState,
  (state: UsuarioState) => state.usuarios
)

export const  getUsuario = createSelector(
  getUsuariosFeatureState,
  (state: UsuarioState) => state.usuario
)

export const  getUsuarioErro = createSelector(
  getUsuariosFeatureState,
  (state: UsuarioState) => state.error
)

export const  getUsuariosAdministradores = createSelector(
  getUsuariosFeatureState,
  (state: UsuarioState) => state.usuarios.filter((filter) => filter.perfil == "Administrador")
)

export const  getUsuariosIdadeMaiorQue50 = createSelector(
  getUsuariosFeatureState,
  (state: UsuarioState) => state.usuarios.filter((filter) => filter.idade >= 50)
)
