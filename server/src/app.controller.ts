import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Endpoint criado pelo CLI do NestJS',
    description: 'Retorna uma mensagem fixa para testes'
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
