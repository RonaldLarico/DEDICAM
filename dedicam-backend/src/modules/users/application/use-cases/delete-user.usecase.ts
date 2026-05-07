import { Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../infrastructure/tokens/user.tokens';

export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  execute = async (id: number) => {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.delete(id);

    return user;
  };
}
