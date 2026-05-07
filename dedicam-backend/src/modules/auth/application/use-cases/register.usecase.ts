import type { AuthRepository } from '../../domain/repositories/auth.repository';
import { HashService } from '../../infrastructure/services/hash.service';
import { TokenService } from '../../infrastructure/services/token.service';
import { ConflictException, Inject } from '@nestjs/common';
import { AUTH_REPOSITORY } from '../../infrastructure/tokens/auth.tokens';

export class RegisterUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepo: AuthRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  execute = async (data: any) => {
    const exists = await this.authRepo.findUserByEmail(data.email);

    if (exists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.hashService.hash(data.password);

    const user = await this.authRepo.createUser({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    return await this.tokenService.generate(user);
  };
}
