import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677431235242 implements MigrationInterface {
    name = 'default1677431235242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "UQ_2863682842e688ca198eb25c124"`);
    }

}
