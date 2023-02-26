import { Recado } from "./IRecados";

export interface Usuario {
  usuarioId: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  recados: [];
}

export interface NovoUsuario {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  recados: [];
}

export interface atualizarUsuario {
  usuarioId: number;
  recados: Recado[];
}
