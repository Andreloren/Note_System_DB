import { combineReducers } from "redux";
import usuarios from "./usuarios/usuariosSlice";
import usuarioLogado from "./usuarioLogado/usuarioLogadoSlice";
import recados from "./recados/recadosSlice";

const rootReducer = combineReducers({
  usuarios,
  usuarioLogado,
  recados,
});

export type State = ReturnType<typeof combineReducers>;

export default rootReducer;
