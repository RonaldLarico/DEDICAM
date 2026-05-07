import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../shared/infrastructure/prisma/prisma.module';
import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { OAuthUseCase } from './application/use-cases/oauth.usecase';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { jwtConfigFactory } from './infrastructure/config/jwt.config';
import { GoogleStrategy } from './infrastructure/strategies/google.strategy';
import { GithubStrategy } from './infrastructure/strategies/github.strategy';
import { XStrategy } from './infrastructure/strategies/x.strategy';
import { LinkedInStrategy } from './infrastructure/strategies/linkedin.strategy';
import { AuthPrismaRepository } from './infrastructure/repositories/auth.prisma.repository';
import { AUTH_REPOSITORY } from './infrastructure/tokens/auth.tokens';
import { TokenService } from './infrastructure/services/token.service';
import { HashService } from './infrastructure/services/hash.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfigFactory,
    }),
  ],

  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthPrismaRepository,
    },
    RegisterUseCase,
    LoginUseCase,
    OAuthUseCase,
    JwtStrategy,
    GoogleStrategy,
    GithubStrategy,
    //LinkedInStrategy,
    //XStrategy,
    HashService,
    TokenService,
  ],
  controllers: [AuthController],
  exports: [
    RegisterUseCase,
    LoginUseCase,
    OAuthUseCase,
  ],
})
export class AuthModule {}
