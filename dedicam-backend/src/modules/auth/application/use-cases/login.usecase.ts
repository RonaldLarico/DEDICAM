import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { AuthRepository } from '../../domain/repositories/auth.repository';
import { HashService } from '../../infrastructure/services/hash.service';
import { TokenService } from '../../infrastructure/services/token.service';
import { LoginDto } from '../dto/login.dto';
import { AUTH_REPOSITORY } from '../../infrastructure/tokens/auth.tokens';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepo: AuthRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  execute = async (data: LoginDto) => {
    const user = await this.authRepo.findUserByEmail(data.email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await this.hashService.compare(data.password, user.password);

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.tokenService.generate(user);
  };
}
