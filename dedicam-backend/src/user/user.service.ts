import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';

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
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  };

  // Crear usuario
  create = async (data: CreateUserDto) => {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    // Nunca devolver password
    const { password, ...safeUser } = user;

    return safeUser;
  };

  // Actualizar usuario
  update = async (id: number, data: UpdateUserDto) => {
    const oldUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!oldUser) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      oldUser,
      updatedUser,
    };
  };

  // Eliminar usuario
  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({
      where: { id },
    });

    return user;
  }
}
