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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enums/roles.enum';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async findAll() {
    const users = await this.userService.findAll();

    return users;
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    const user = await this.userService.findOne(id);

    return user;
  }

  @Post()
  async create(
    @Body()
    body: CreateUserDto,
  ) {
    const user = await this.userService.create(body);

    return user;
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  async update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    body: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, body);

    return user;
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  async remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    const user = await this.userService.remove(id);

    return user;
  }
}
