import { MigrationInterface, QueryRunner } from "typeorm";

export class Authenticate1774122106347 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS authenticate (
            id VARCHAR(255) NOT NULL PRIMARY KEY,
            userId VARCHAR(255) NOT NULL,
            token VARCHAR(255) NOT NULL UNIQUE,
            expiresAt DATETIME NOT NULL,
            isActive BOOLEAN NOT NULL DEFAULT TRUE,
            createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT FK_authenticate_user FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS authenticate CASCADE;`);
    }

}
