import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { UserRepository } from '../../domain/repositories/user.repository';
import bcrypt from 'bcrypt';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll = async () => {
    const users = await this.prisma.user.findMany();

    return UserMapper.toDomainList(users);
  };

  findById = async (id: number) => {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? UserMapper.toDomain(user) : null;
  };

  findByEmail = async (email: string) => {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? UserMapper.toDomain(user) : null;
  };

  create = async (data: any) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return UserMapper.toDomain(user);
  };

  update = async (id: number, data: any) => {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return UserMapper.toDomain(user);
  };

  delete = async (id: number) => {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return UserMapper.toDomain(user);
  };
}