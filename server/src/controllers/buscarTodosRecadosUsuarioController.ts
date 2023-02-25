import { Request, Response } from "express";
import { BuscarTodosRecadosUsuarioService } from "../services/buscarTodosRecadosUsuarioService";
import { status } from "../types/tipos";

export class BuscarTodosRecadosUsuarioController {
  async buscar(req: Request, res: Response) {
    const { usuarioId } = req.params;
    const { filter } = req.query;

    try {
      const service = new BuscarTodosRecadosUsuarioService();

      const result = await service.execute(Number(usuarioId));

      if (result instanceof Error) {
        return res.status(400).json({ mensagem: result.message });
      }

      const filtroRecados = filter
        ? result!.recados
            .filter(
              (f: { descricao: string; detalhamento: string }) =>
                f.descricao
                  .toLowerCase()
                  .includes(filter.toString().toLowerCase()) ||
                f.detalhamento
                  .toLowerCase()
                  .includes(filter.toString().toLowerCase())
            )
            .map(
              (m: {
                recadoId: string;
                status: status;
                descricao: string;
                detalhamento: string;
              }) => {
                return {
                  recadoId: m.recadoId,
                  status: m.status,
                  descricao: m.descricao,
                  detalhamento: m.detalhamento,
                };
              }
            )
        : result;

      return res.status(200).json({
        mensagem: "Dados encontrados com sucesso",
        data: filtroRecados,
      });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Internal Server Error",
      });
    }
  }
}
