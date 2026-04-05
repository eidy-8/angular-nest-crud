import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { EntityEntity } from "./entities/entity.entity";
import { AuthenticateEntity } from "./entities/authenticate.entity";
import { AuthorizeEntity } from "./entities/authorize.entity";
import { UserEntity } from "./entities/user.entity";

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: configService.get<string>('DB_HOST') ?? 'localhost',
    port: +(configService.get<number>('DB_PORT') ?? 3307),
    username: configService.get<string>('DB_USER') ?? 'root',
    password: configService.get<string>('DB_PASS') ?? 'password',
    database: configService.get<string>('DB_DATABASE') ?? 'database',
    entities: [AuthenticateEntity, AuthorizeEntity, EntityEntity, UserEntity],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
    logging: false,
}

export default new DataSource(dataSourceOptions);