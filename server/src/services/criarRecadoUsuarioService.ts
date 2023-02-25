import { RecadosEntity } from "../database/entities/recados.entity";
import { recadoRepository } from "../repository/recadosRepository";
import { CriarRecadoRequest } from "../types/tipos";

export class CriarRecadoUsuarioService {
  async execute({
    descricao,
    detalhamento,
    usuario,
  }: CriarRecadoRequest): Promise<RecadosEntity> {
    const novoRecado = recadoRepository.create({
      descricao,
      detalhamento,
      usuario,
    });

    await recadoRepository.save(novoRecado);

    return novoRecado;
  }
}
