import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthenticateService } from 'src/core/authenticate/authenticate.service';

interface AuthRequest extends Request {
  user?: any;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {

  private readonly jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authenticateService: AuthenticateService
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') ?? '';
    if (!this.jwtSecret) {
      throw new Error('JWT_SECRET não configurado no ambiente.');
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não fornecido.');
    }

    try {      
      const active = await this.authenticateService.validateToken(token);

      const payload = await this.jwtService.verifyAsync(token);
      
      if (!active) {
        throw new UnauthorizedException('Sessão expirada ou revogada.');
      }

      request.user = payload;
      return true;
    } catch (error) {      
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
  }

  private extractTokenFromHeader(request: AuthRequest): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization) return undefined;

    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
