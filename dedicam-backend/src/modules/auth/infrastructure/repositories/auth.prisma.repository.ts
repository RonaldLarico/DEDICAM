import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { AuthRepository } from '../../domain/repositories/auth.repository';

@Injectable()
export class AuthPrismaRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail = async (email: string) => {
    return await this.prisma.user.findUnique({ where: { email } });
  };

  createUser = async (data) => {
    return await this.prisma.user.create({ data });
  };

  findAccount = async (provider: string, providerAccountId: string) => {
    return await this.prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
      include: { user: true },
    });
  };

  createAccount = async (data) => {
    await this.prisma.account.create({ data });
  };
}