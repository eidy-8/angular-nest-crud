import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticateService } from '../authenticate/authenticate.service';
import { AuthenticateEntity } from 'src/db/entities/authenticate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AuthenticateEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET') || 'fallback_secret';
        const expiresIn = configService.get<string>('JWT_EXPIRATION') || 3600000;

        return {
          secret,
          signOptions: {
            expiresIn: expiresIn as 3600000
          },
        };
      },
    }),
  ],
  providers: [UserService, AuthenticateService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
