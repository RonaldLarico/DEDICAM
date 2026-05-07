import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaModule } from '../../shared/infrastructure/prisma/prisma.module';
import { UserPrismaRepository } from './infrastructure/repositories/user.prisma.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { GetUsersUseCase } from './application/use-cases/get-users.usecase';
import { GetUserUseCase } from './application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { USER_REPOSITORY } from './infrastructure/tokens/user.tokens';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
    CreateUserUseCase,
    GetUsersUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
