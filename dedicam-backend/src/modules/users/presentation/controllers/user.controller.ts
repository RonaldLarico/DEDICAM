import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUsersUseCase } from '../../application/use-cases/get-users.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';

import { RolesGuard } from '../../../auth/infrastructure/guards/roles.guard';
import { Roles } from '../../../auth/presentation/decorators/roles.decorator';
import { UserRole } from '../../domain/enums/roles.enum';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { Audit } from '../../../audit/infrastructure/audit.decorator';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUsers: GetUsersUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async findAll() {
    return await this.getUsers.execute();
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.getUser.execute(id);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @Audit('CREATE_USER')
  async create(
    @Body() body: CreateUserDto,
  ) {
    return await this.createUser.execute(body);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Audit('UPDATE_USER')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return await this.updateUser.execute(id, body);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @Audit('DELETE_USER')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.deleteUser.execute(id);
  }
}