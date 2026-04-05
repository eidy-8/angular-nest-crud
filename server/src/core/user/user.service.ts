import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { User, CreateUserDto, LoginDto, AuthResponseDto } from './user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateService } from '../authenticate/authenticate.service';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        private readonly authenticateService: AuthenticateService,
        private readonly configService: ConfigService,
    ){}

    /**
     * REGISTRO: Cria novo usuário com senha criptografada
     * @param createUserDto email, password, name
     * @returns Retorna o usuário criado com token JWT
     */
    async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
        // 1. Verifica se email já existe
        const existingUser = await this.usersRepository.findOne({ 
            where: { email: createUserDto.email } 
        });

        if (existingUser) {
            throw new ConflictException('Email já está registrado!');
        }

        // 2. Hash da senha com bcryptjs (salt rounds = 10)
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        // 3. Cria novo usuário no banco
        const newUser = new UserEntity();
        newUser.email = createUserDto.email;
        newUser.password = hashedPassword;
        newUser.name = createUserDto.name;
        newUser.created_at = new Date();

        const savedUser = await this.usersRepository.save(newUser);

        // 4. Gera token JWT
        const access_token = this.jwtService.sign(
            { 
                sub: savedUser.id, // subject = id do usuário
                email: savedUser.email 
            }
        );

        // 5. Armazena sessão ativa no auth.authenticate
        await this.authenticateService.createSession(
            savedUser.id,
            access_token,
            new Date(Date.now() + this.getJwtExpirationMs())
        );

        // 6. Retorna resposta com token e dados do usuário
        return {
            access_token,
            user: {
                id: savedUser.id,
                email: savedUser.email,
                name: savedUser.name
            }
        };
    }

    /**
     * LOGIN: Autentica usuário e retorna token JWT
     * @param loginDto email e password
     * @returns Token JWT e dados do usuário
     */
    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        // 1. Busca usuário por email
        const user = await this.usersRepository.findOne({
            where: { email: loginDto.email }
        });

        if (!user) {
            throw new UnauthorizedException('Email ou senha incorretos');
        }

        // 2. Valida senha comparando com hash armazenado
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email ou senha incorretos');
        }

        // 3. Gera token JWT
        const access_token = this.jwtService.sign(
            { 
                sub: user.id, // subject = id do usuário
                email: user.email 
            }
        );

        // 4. Armazena sessão ativa no auth.authenticate
        await this.authenticateService.createSession(
            user.id,
            access_token,
            new Date(Date.now() + this.getJwtExpirationMs())
        );        

        // 5. Retorna resposta
        return {
            access_token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    }

    private getJwtExpirationMs(): number {
        const configured = this.configService.get<string>('JWT_EXPIRATION');

        return Number(configured) || 3600000;
    }

    /**
     * Busca usuário por ID (útil para rotas protegidas)
     * @param id ID do usuário
     * @returns Dados do usuário sem a senha
     */
    async findById(id: string) {
        const user = await this.usersRepository.findOne({ where: { id } });
        
        if (!user) {
            throw new BadRequestException('Usuário não encontrado');
        }

        // Retorna sem a senha
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
