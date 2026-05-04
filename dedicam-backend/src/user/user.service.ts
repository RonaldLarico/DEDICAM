import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todos los usuarios
  findAll = async () => {
    const users = await this.prisma.user.findMany();

    return users;
  };

  // Obtener un usuario por id
  findOne = async (id: number) => {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  };

  // Crear usuario
  create = async (data: CreateUserDto) => {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  };

  // Actualizar usuario
  update = async (id: number, data: UpdateUserDto) => {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  };

  // Eliminar usuario
  remove = async (id: number) => {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  };
}
