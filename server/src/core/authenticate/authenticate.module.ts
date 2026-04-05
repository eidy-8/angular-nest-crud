import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticateEntity } from 'src/db/entities/authenticate.entity';
import { UserEntity } from 'src/db/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthenticateEntity, UserEntity])],
  providers: [AuthenticateService],
  controllers: [AuthenticateController]
})
export class AuthenticateModule {}
