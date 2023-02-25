import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { status } from "../../types/tipos";
import { UsuariosEntity } from "./usuarios.entity";

@Entity({ name: "recados" })
export class RecadosEntity {
  @PrimaryGeneratedColumn("uuid", { name: "recado_id" })
  recadoId!: string;

  @Column({ type: "text", default: "ativo" })
  status!: status;

  @Column({ type: "text" })
  descricao!: string;

  @Column({ type: "text" })
  detalhamento!: string;

  @CreateDateColumn({ name: "create_at", type: "timestamp" })
  createRecado!: Date;

  @Column({ name: "update_at", type: "timestamp", nullable: true })
  updateRecado?: Date;

  @ManyToOne(() => UsuariosEntity, (fkusuario) => fkusuario.recados)
  @JoinColumn({ name: "usuarioId", referencedColumnName: "usuarioId" })
  usuario!: UsuariosEntity;

  @BeforeUpdate()
  beforeUpdate() {
    this.updateRecado = new Date();
  }
}
