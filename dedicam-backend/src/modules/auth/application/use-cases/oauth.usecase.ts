import { Inject, Injectable } from '@nestjs/common';
import type { AuthRepository } from '../../domain/repositories/auth.repository';
import { TokenService } from '../../infrastructure/services/token.service';
import { AUTH_REPOSITORY } from '../../infrastructure/tokens/auth.tokens';

@Injectable()
export class OAuthUseCase {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepo: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  execute = async (profile: any) => {
    let account = await this.authRepo.findAccount(
      profile.provider,
      String(profile.providerAccountId),
    );

    if (account) {
      return await this.tokenService.generate(account.user);
    }

    let user = await this.authRepo.findUserByEmail(profile.email);

    if (!user) {
      user = await this.authRepo.createUser({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        avatarUrl: profile.avatarUrl,
        isVerified: true,
      });
    }

    await this.authRepo.createAccount({
      userId: user.id,
      provider: profile.provider,
      providerAccountId: String(profile.providerAccountId),
    });

    return await this.tokenService.generate(user);
  };
}
