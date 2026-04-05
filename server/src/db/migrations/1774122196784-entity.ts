import { MigrationInterface, QueryRunner } from "typeorm";

export class Entity1774122196784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS entity (
                id VARCHAR(255) NOT NULL PRIMARY KEY,
                id_entity VARCHAR(255) NULL,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                invite VARCHAR(255) NULL,
                logo VARCHAR(255) NULL,
                theme TEXT NULL,
                active BOOLEAN NOT NULL DEFAULT true,
                created_at TIMESTAMP NULL,
                updated_at TIMESTAMP NULL,
                deleted_at TIMESTAMP NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS entity CASCADE;`);
    }

}
