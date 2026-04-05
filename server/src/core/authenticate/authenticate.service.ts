import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticateEntity } from 'src/db/entities/authenticate.entity';

@Injectable()
export class AuthenticateService {
  constructor(
    @InjectRepository(AuthenticateEntity) private readonly authenticateRepository: Repository<AuthenticateEntity>,
  ) {}

  async createSession(userId: string, token: string, expiresAt: Date) {
    const session = this.authenticateRepository.create({
      userId,
      token,
      expiresAt,
      isActive: true,
    });

    return this.authenticateRepository.save(session);
  }

  async getActiveSessions(userId: string) {
    return this.authenticateRepository.find({
      where: { userId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async revokeSession(token: string) {
    const session = await this.authenticateRepository.findOne({ where: { token } });
    if (!session) {
      throw new BadRequestException('Sessão não encontrada');
    }

    session.isActive = false;
    return this.authenticateRepository.save(session);
  }

  async revokeAllSessions(userId: string) {
    await this.authenticateRepository.update({ userId }, { isActive: false });
    return this.getActiveSessions(userId);
  }

  async validateToken(token: string) {    
    const session = await this.authenticateRepository.findOne({ where: { token, isActive: true } });
    if (!session) {
      return false;
    }
    if (session.expiresAt < new Date()) {
      session.isActive = false;
      await this.authenticateRepository.save(session);
      return false;
    }
    return true;
  }
}
