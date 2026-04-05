import { Module } from '@nestjs/common';
import { AuthorizeController } from './authorize.controller';
import { AuthorizeService } from './authorize.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizeEntity } from 'src/db/entities/authorize.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { AuthenticateEntity } from 'src/db/entities/authenticate.entity';
import { EntityEntity } from 'src/db/entities/entity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorizeEntity, UserEntity, AuthenticateEntity, EntityEntity])],
  controllers: [AuthorizeController],
  providers: [AuthorizeService],
  exports: [AuthorizeService],
})
export class AuthorizeModule {}
