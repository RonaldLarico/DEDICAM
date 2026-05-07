import { Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../infrastructure/tokens/user.tokens';

export class GetUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  execute = async () => {
    const users = await this.userRepository.findAll();
    return users;
  };
}
