import { status } from "../shared/components/tipos/Tipos";

export interface Recado {
  recadoId: string;
  status: status;
  descricao: string;
  detalhamento: string;
}

export interface IatualizaRecado {
  usuarioId: number;
  recado: Recado;
}

export interface IcriarRecado {
  usuarioId: number;
  recado: Omit<Recado, "recadoId" | "status">;
}

export interface IdeleteRecado {
  usuarioId: number;
  recadoId: string;
}

export interface IFilter {
  usuarioId: number;
  filter?: string;
}
