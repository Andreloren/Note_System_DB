import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1676675493940 implements MigrationInterface {
  name = "CreateTables1676675493940";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuario" ("usuario_id" SERIAL NOT NULL, "nome" text NOT NULL, "email" text NOT NULL, "cpf" text NOT NULL, "senha" text NOT NULL, "create_user_at" TIMESTAMP NOT NULL DEFAULT now(), "update_user_at" TIMESTAMP, CONSTRAINT "UQ_28cd8597e57c8197d4929a98e7a" UNIQUE ("cpf"), CONSTRAINT "PK_877d906b2b8b32d99cf7164ec19" PRIMARY KEY ("usuario_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "recados" ("recado_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" text NOT NULL DEFAULT 'ativo', "descricao" text NOT NULL, "detalhamento" text NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP, "usuarioId" integer, CONSTRAINT "PK_10e1aeb2073ceac9c931547216a" PRIMARY KEY ("recado_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "recados" ADD CONSTRAINT "FK_fd175d6df759ef7aa47b681644e" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recados" DROP CONSTRAINT "FK_fd175d6df759ef7aa47b681644e"`
    );
    await queryRunner.query(`DROP TABLE "recados"`);
    await queryRunner.query(`DROP TABLE "usuario"`);
  }
}
