import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import { requisicaoApi } from "../../../services/api";

import { NovoUsuario, Usuario } from "../../../interfaces";

const userAdapter = createEntityAdapter<Usuario>({
  selectId: (user) => user.usuarioId,
});

export const {
  selectAll: selecionarUsuarios,
  selectById: selecionarUsuariosPorCpf,
} = userAdapter.getSelectors((state: RootState) => state.usuarios);

export const buscarUsuariosAPI = createAsyncThunk(
  "usuarios/buscarUsuarios",
  async () => {
    const respostaApi = await requisicaoApi.get("/usuarios");

    const dataPartial = JSON.parse(respostaApi.data);

    return dataPartial;
  }
);

export const adicionarUsuarioAPI = createAsyncThunk(
  "usuarios/adicionarUsuario",
  async (novoUsuario: NovoUsuario) => {
    const respostaApi = await requisicaoApi.post(
      "/usuarios",
      JSON.stringify(novoUsuario)
    );

    const dataParsed = JSON.parse(respostaApi.data);

    return dataParsed;
  }
);

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState: userAdapter.getInitialState({
    mensagem: "",
  }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(buscarUsuariosAPI.fulfilled, (state, action) => {
      state.mensagem = action.payload.message;
      userAdapter.setAll(state, action.payload.data);
    });

    builder.addCase(adicionarUsuarioAPI.fulfilled, (state, action) => {
      state.mensagem = action.payload.message;
      userAdapter.addOne(state, action.payload.data);
    });
  },
});

export default usuariosSlice.reducer;
