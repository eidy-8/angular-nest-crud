import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorizeEntity } from 'src/db/entities/authorize.entity';

@Injectable()
export class AuthorizeService {
  constructor(
    @InjectRepository(AuthorizeEntity) private readonly authorizeRepository: Repository<AuthorizeEntity>,
  ) {}

  async assignRole(userId: string, role: string, permissions: string[] = []) {
    const authorization = this.authorizeRepository.create({
      userId,
      role,
      permissions,
    });
    return this.authorizeRepository.save(authorization);
  }

  async getRoles(userId: string) {
    return this.authorizeRepository.find({ where: { userId } });
  }

  async hasPermission(userId: string, permission: string) {
    const authorizations = await this.authorizeRepository.find({ where: { userId } });
    if (!authorizations || authorizations.length === 0) {
      return false;
    }

    return authorizations.some((auth) => auth.permissions.includes(permission));
  }

  async removeRole(id: string) {
    const role = await this.authorizeRepository.findOne({ where: { id } });
    if (!role) {
      throw new BadRequestException('Função não encontrada');
    }
    return this.authorizeRepository.remove(role);
  }
}
