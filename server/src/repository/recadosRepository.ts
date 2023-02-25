import { AppDataSource } from "../database/data-source";
import { RecadosEntity } from "../database/entities/recados.entity";

export const recadoRepository = AppDataSource.getRepository(RecadosEntity);
