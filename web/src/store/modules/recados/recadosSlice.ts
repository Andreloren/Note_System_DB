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
  selectId: (recados) => recados?.id,
});

export const { selectAll: buscarRecados, selectById: buscarRecadoPorId } =
  adapter.getSelectors((state: RootState) => state.recados);

export const buscarRecadosUsuarioAPI = createAsyncThunk<any, IFilter>(
  "recado/buscarTodos",
  async (objeto: IFilter) => {
    let url = `/usuarios/${objeto.cpf}/recados`;

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
  async (dados: IcriarRecado, { dispatch }) => {
    const respostaApi = await requisicaoApi.post(
      `/usuarios/${dados.cpf}/recados`,
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
      `/usuarios/${dados.cpf}/recados/${dados.recado.id}`,
      JSON.stringify(dados.recado)
    );

    const dataPartial = JSON.parse(respostaApi.data);

    if (respostaApi.status === 200) {
      dispatch(
        buscarRecadosUsuarioAPI({
          cpf: dados.cpf,
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
      `/usuarios/${dados.cpf}/recados/${dados.id}`
    );

    const dataPartial = JSON.parse(respostaApi.data);

    return dataPartial;
  }
);

const recadoSlice = createSlice({
  name: "recados",
  initialState: adapter.getInitialState({
    sucess: false,
    message: "",
  }),
  reducers: {
    deletarTodos: adapter.removeAll,
    adicionarTodosRecados: adapter.setAll,
  },
  extraReducers(builder) {
    builder.addCase(buscarRecadosUsuarioAPI.fulfilled, (state, action) => {
      state.sucess = action.payload.sucess;
      state.message = action.payload.message;
      adapter.setAll(state, action.payload.data);
    });

    builder.addCase(adicionarRecadoAPI.fulfilled, (state, action) => {
      state.sucess = action.payload.sucess;
      state.message = action.payload.message;
      adapter.addOne(state, action.payload.data);
    });

    builder.addCase(atualizarRecadoAPI.fulfilled, (state, action) => {
      state.sucess = action.payload.sucess;
      state.message = action.payload.message;
      adapter.updateOne(state, {
        id: action.payload.data.id,
        changes: action.payload.data,
      });
    });

    builder.addCase(deletarRecadoAPI.fulfilled, (state, action) => {
      state.sucess = action.payload.sucess;
      state.message = action.payload.message;
      adapter.removeOne(state, action.payload.data.id);
    });
  },
});

export const { deletarTodos, adicionarTodosRecados } = recadoSlice.actions;

export default recadoSlice.reducer;
