import { Body, Controller, Post, Get, UseGuards, Request, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateUserDto, LoginDto, AuthResponseDto, UpdateUserDto, User } from './user.dto';
import { AutenticacaoGuard } from 'src/guards/autenticacao.guard';

@ApiTags('Usuários & Autenticação')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    /**
     * ENDPOINT DE REGISTRO
     * POST /user/register
     * Body: { email, password, name }
     * Response: { access_token, user: { id, email, name } }
     */
    @Post('register')
    @ApiOperation({ 
        summary: 'Registrar novo usuário',
        description: 'Cria um novo usuário com email, senha e nome. Retorna token JWT.'
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Usuário criado com sucesso',
        type: AuthResponseDto 
    })
    @ApiResponse({ 
        status: 409, 
        description: 'Email já registrado' 
    })
    register(@Body() createUserDto: CreateUserDto): Promise<void> {
        return this.userService.register(createUserDto);
    }

    @Put('/:id')
    @ApiOperation({ 
        summary: 'Atualizar dados do usuário',
        description: 'Atualiza um usuário com email, senha ou nome.'
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Usuário atualizado com sucesso',
        type: AuthResponseDto 
    })
    @ApiResponse({ 
        status: 406, 
        description: 'Dados inválidos' 
    })
    @ApiBody({ type: UpdateUserDto, description: 'Dados do usuário para atualização' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    /**
     * ENDPOINT DE LOGIN
     * POST /user/login
     * Body: { email, password }
     * Response: { access_token, user: { id, email, name } }
     */
    @Post('login')
    @ApiOperation({ 
        summary: 'Fazer login com email e senha',
        description: 'Autentica usuário e retorna token JWT válido por 1 hora.'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Login efetuado com sucesso',
        type: AuthResponseDto 
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Email ou senha incorretos' 
    })
    login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        return this.userService.login(loginDto);
    }

    /**
     * ENDPOINT PROTEGIDO (exemplo)
     * GET /user/me
     * Headers: Authorization: Bearer <token>
     * Response: Dados do usuário autenticado
     */
    @Get('me')
    @UseGuards(AutenticacaoGuard) 
    @ApiBearerAuth('JWT')
    @ApiOperation({ 
        summary: 'Obter dados do usuário autenticado',
        description: 'Retorna os dados do usuário baseado no token JWT fornecido. REQUER TOKEN!'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Dados do usuário'
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Token não fornecido ou inválido' 
    })
    getMe(@Request() req: any) {
        const user = this.userService.findById(req.user.sub);
        return user;
    }
}
