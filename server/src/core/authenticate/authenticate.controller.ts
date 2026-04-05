import { Controller, Get, Post, Body, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Get('sessions/:userId')
  @ApiOperation({ 
    summary: 'Trazer sessões ativas do usuário',
    description: 'Traz todas as sessões ativas do usuário.'
  })
  async getActiveSessions(@Param('userId') userId: string) {
    return this.authenticateService.getActiveSessions(userId);
  }

  @Post('sessions')
  @ApiOperation({ 
    summary: 'Criar sessão para um usuário específico',
    description: 'Utilizado para o login de usuário.'
  })
  async createSession(@Body() body: { userId: string; token: string; expiresAt: number }) {
    const expiresAt = new Date(body.expiresAt);
    return this.authenticateService.createSession(body.userId, body.token, expiresAt);
  }

  @Delete('sessions/:token')
  @ApiOperation({ 
    summary: 'Desativar uma sessão específica',
    description: 'Desativar uma sessão específica.'
  })
  @HttpCode(204)
  async revokeSession(@Param('token') token: string) {
    await this.authenticateService.revokeSession(token);
  }

  @Delete('sessions/user/:userId')
  @ApiOperation({ 
    summary: 'Desativar todas as sessões de um usuário específico',
    description: 'Desativar todas as sessões de um usuário específico.'
  })
  @HttpCode(204)
  async revokeAll(@Param('userId') userId: string) {
    await this.authenticateService.revokeAllSessions(userId);
  }
}
