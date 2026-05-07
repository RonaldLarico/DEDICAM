import { Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../infrastructure/tokens/user.tokens';

export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  execute = async (id: number, data: any) => {
    const oldUser = await this.userRepo.findById(id);

    if (!oldUser) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userRepo.update(id, data);

    return {
      oldUser,
      updatedUser,
    };
  };
}
