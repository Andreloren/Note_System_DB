import { AppDataSource } from "../database/data-source";
import { UsuariosEntity } from "../database/entities/usuarios.entity";

export const usuarioRepository = AppDataSource.getRepository(UsuariosEntity);
