import { MigrationInterface, QueryRunner } from "typeorm";

export class Authorize1774122143199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS authorize (
            id VARCHAR(255) NOT NULL PRIMARY KEY,
            userId VARCHAR(255) NOT NULL,
            role VARCHAR(100) NOT NULL,
            permissions TEXT NOT NULL,
            CONSTRAINT FK_authorize_user FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS authorize CASCADE;`);
    }
}
