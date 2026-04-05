import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DB_HOST') ?? "localhost",
                port: +(configService.get<number>('DB_PORT') ?? 3307),
                username: configService.get<string>('DB_USER') ?? "root",
                password: configService.get<string>('DB_PASS') ?? "root",
                database: configService.get<string>('DB_DATABASE') ?? "database",
                entities: [__dirname + '/entities/**'],
                migrations: [__dirname + '/migrations/*.ts'],
                synchronize: false,
                logging: false,
            }),
            inject: [ConfigService]
        })
    ]
})
export class DbModule {}
