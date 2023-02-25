import { Recado } from "./IRecados";

export interface Usuario {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  recados: [];
}

export interface atualizarUsuario {
  cpf: string;
  recados: Recado[];
}
