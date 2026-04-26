import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, IsUUID } from "class-validator";

export class User {
    @IsUUID()
    @IsOptional()
    @ApiProperty({ example: null })
    id: string;

    @IsString()
    @ApiProperty({ example: 'teste@gmail.com' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'senhateste' })
    password: string;

    @IsString()
    @ApiProperty({ example: 'Teste Do Teste' })
    name: string;
}

export class FindAllUsersParameters {
    @IsString()
    @IsOptional()
    page: string;
    
    @IsString()
    @IsOptional()
    pageSize: string;
    
    @IsString()
    @IsOptional()
    filter: string;
}

/**
 * DTO para REGISTRO: Criar novo usuário
 * Valida email, senha mín 6 chars, nome obrigatório
 */
export class CreateUserDto {
    @IsString()
    @ApiProperty({ example: 'novo@gmail.com', description: 'Email único do usuário' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'senha123', description: 'Senha com mínimo 6 caracteres' })
    password: string;

    @IsString()
    @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
    name: string;
}

/**
 * DTO para ATUALIZAÇÃO: Atualizar usuário
 * Valida email, senha mín 6 chars, nome obrigatório
 */
export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'atualização@gmail.com', description: 'Email para atualização do usuário' })
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'senha123', description: 'Senha com mínimo 6 caracteres para atualização do usuário' })
    password: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'João Silva', description: 'Nome completo para atualização do usuário' })
    name: string;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    @ApiProperty({ example: new Date() })
    updated_at: Date;
}

/**
 * DTO para LOGIN: Autenticar usuário
 * Valida email e senha para gerar token JWT
 */
export class LoginDto {
    @IsString()
    @ApiProperty({ example: 'usuario@gmail.com', description: 'Email do usuário' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
    password: string;
}

/**
 * DTO para resposta de LOGIN/REGISTRO
 * Retorna o token JWT e dados do usuário
 */
export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Token JWT para autenticação' })
    access_token: string;

    @ApiProperty({ 
        example: { id: 'uuid-123', email: 'usuario@gmail.com', name: 'João' },
        description: 'Dados do usuário autenticado'
    })
    user: {
        id: string;
        email: string;
        name: string;
    };
}