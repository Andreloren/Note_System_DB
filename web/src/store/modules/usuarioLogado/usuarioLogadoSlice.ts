import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const usuarioLogadoSlice = createSlice({
  name: "usuarioLogado",
  initialState,
  reducers: {
    limparUsuarioLogado() {
      localStorage.clear();
      return initialState;
    },
    incluirUsuarioLogado(state, action) {
      localStorage.setItem("usuarioLogado", action.payload);
      return action.payload;
    },
  },
});

export const { limparUsuarioLogado, incluirUsuarioLogado } =
  usuarioLogadoSlice.actions;

export default usuarioLogadoSlice.reducer;
