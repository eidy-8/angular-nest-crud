import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, LoginDto, AuthResponseDto } from './user.dto';
import { AutenticacaoGuard } from 'src/guards/autenticacao.guard';

@ApiTags('Usuários & Autenticação') // Agrupa no Swagger
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
    async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
        return this.userService.register(createUserDto);
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
    async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        return this.userService.login(loginDto);
    }

    /**
     * ENDPOINT PROTEGIDO (exemplo)
     * GET /user/me
     * Headers: Authorization: Bearer <token>
     * Response: Dados do usuário autenticado
     */
    @Get('me')
    @UseGuards(AutenticacaoGuard) // ← Aqui ativa o guard JWT!
    @ApiBearerAuth('JWT') // ← Mostra no Swagger que precisa de token
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
    async getMe(@Request() req: any) {
        // req.user é preenchido pelo AutenticacaoGuard
        // Contém { sub: userId, email: userEmail }
        const user = await this.userService.findById(req.user.sub);
        return user;
    }
}
