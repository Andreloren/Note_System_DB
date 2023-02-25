import { status } from "../shared/components/tipos/Tipos";

export interface Recado {
  id: string;
  status: status;
  descricao: string;
  detalhamento: string;
}

export interface IatualizaRecado {
  cpf: string;
  recado: Recado;
}

export interface IcriarRecado {
  cpf: string;
  recado: Omit<Recado, "id" | "status">;
}

export interface IdeleteRecado {
  cpf: string;
  id: string;
}

export interface IFilter {
  cpf: string;
  filter?: string;
}
