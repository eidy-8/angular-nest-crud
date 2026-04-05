import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { EntityModule } from './core/entity/entity.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthenticateModule } from './core/authenticate/authenticate.module';
import { AuthorizeModule } from './core/authorize/authorize.module';
import { UserModule } from './core/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ScheduleModule.forRoot(),
    DbModule,
    EntityModule,
    AuthenticateModule,
    AuthorizeModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
