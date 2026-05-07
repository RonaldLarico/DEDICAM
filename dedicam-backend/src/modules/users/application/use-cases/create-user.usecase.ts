import { ConflictException, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { USER_REPOSITORY } from '../../infrastructure/tokens/user.tokens';

export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  execute = async (data: any) => {
    const exists = await this.userRepo.findByEmail(data.email);

    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.userRepo.create(data);

    const { password, ...safeUser } = user;
    return safeUser;
  };
}
