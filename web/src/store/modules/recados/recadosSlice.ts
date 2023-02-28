import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import { requisicaoApi } from "../../../services/api";
import {
  IatualizaRecado,
  IcriarRecado,
  IdeleteRecado,
  IFilter,
  Recado,
} from "../../../interfaces";

const adapter = createEntityAdapter<Recado>({
  selectId: (recados) => recados?.recadoId,
});

export const { selectAll: buscarRecados, selectById: buscarRecadoPorId } =
  adapter.getSelectors((state: RootState) => state.recados);

export const buscarRecadosUsuarioAPI = createAsyncThunk<any, IFilter>(
  "recado/buscarTodos",
  async (objeto: IFilter) => {
    let url = `/usuarios/${objeto.usuarioId}/recados`;

    if (objeto.filter) {
      url += `?filter=${objeto.filter}`;
    }
    const respostaApi = await requisicaoApi.get(url);

    const dataPartial = JSON.parse(respostaApi.data);

    return dataPartial;
  }
);

export const adicionarRecadoAPI = createAsyncThunk(
  "recado/adicionarNovo",
  async (dados: IcriarRecado) => {
    const respostaApi = await requisicaoApi.post(
      `/usuarios/${dados.usuarioId}/recados`,
      JSON.stringify(dados.recado)
    );

    const dataPartial = JSON.parse(respostaApi.data);

    return dataPartial;
  }
);

export const atualizarRecadoAPI = createAsyncThunk(
  "recado/atualizarRecado",
  async (dados: IatualizaRecado, { dispatch }) => {
    const respostaApi = await requisicaoApi.put(
      `/usuarios/${dados.usuarioId}/recados/${dados.recado.recadoId}`,
      JSON.stringify(dados.recado)
    );

    const dataPartial = JSON.parse(respostaApi.data);

    if (respostaApi.status === 200) {
      dispatch(
        buscarRecadosUsuarioAPI({
          usuarioId: dados.usuarioId,
        })
      );
    }
    return dataPartial;
  }
);

export const deletarRecadoAPI = createAsyncThunk(
  "recado/deletarRecado",
  async (dados: IdeleteRecado) => {
    const respostaApi = await requisicaoApi.delete(
      `/usuarios/${dados.usuarioId}/recados/${dados.recadoId}`
    );

    const dataPartial = JSON.parse(respostaApi.data);

    return dataPartial;
  }
);

const recadoSlice = createSlice({
  name: "recados",
  initialState: adapter.getInitialState({
    mensagem: "",
  }),
  reducers: {
    deletarTodos: adapter.removeAll,
    adicionarTodosRecados: adapter.setAll,
  },
  extraReducers(builder) {
    builder.addCase(buscarRecadosUsuarioAPI.fulfilled, (state, action) => {
      state.mensagem = action.payload.message;
      adapter.setAll(state, action.payload.data);
    });

    builder.addCase(adicionarRecadoAPI.fulfilled, (state, action) => {
      state.mensagem = action.payload.message;
      adapter.addOne(state, action.payload.data);
    });

    builder.addCase(atualizarRecadoAPI.fulfilled, (state, action) => {
      state.mensagem = action.payload.message;
      adapter.updateOne(state, {
        id: action.payload.data.recadoId,
        changes: action.payload.data.recados,
      });
    });

    builder.addCase(deletarRecadoAPI.fulfilled, (state, action) => {
      state.mensagem = action.payload.message;
      adapter.removeOne(state, action.payload.data.recadoId);
    });
  },
});

export const { deletarTodos, adicionarTodosRecados } = recadoSlice.actions;

export default recadoSlice.reducer;
