import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1754383994106 implements MigrationInterface {
    name = 'CreateUserTable1754383994106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstname\` varchar(80) NOT NULL, \`lastname\` varchar(80) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`User\``);
    }

}
