import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { AuthorizeService } from './authorize.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('authorize')
export class AuthorizeController {
  constructor(private readonly authorizeService: AuthorizeService) {}

  @Post('assign')
  @ApiOperation({ 
    summary: 'Conceder um privilégio ao usuário específico',
    description: 'Concede um privilégio ao usuário específico.'
  })
  async assignRole(@Body() body: { userId: string; role: string; permissions?: string[] }) {
    return this.authorizeService.assignRole(body.userId, body.role, body.permissions || []);
  }

  @Get('roles/:userId')
  @ApiOperation({ 
    summary: 'Trazer os privilégios do usuário específico',
    description: 'Trazer os privilégios do usuário específico.'
  })
  async getRoles(@Param('userId') userId: string) {
    return this.authorizeService.getRoles(userId);
  }

  @Get('permission/:userId/:permission')
  @ApiOperation({ 
    summary: 'Verificar se o usuário específico possui privilégio',
    description: 'Verifica se o usuário específico possui privilégio.'
  })
  async hasPermission(@Param('userId') userId: string, @Param('permission') permission: string) {
    return { userId, permission, authorized: await this.authorizeService.hasPermission(userId, permission) };
  }

  @Delete('role/:id')
  @ApiOperation({ 
    summary: 'Deletar privilégio específico',
    description: 'Deleta privilégio específico.'
  })
  async removeRole(@Param('id') id: string) {
    return this.authorizeService.removeRole(id);
  }
}
