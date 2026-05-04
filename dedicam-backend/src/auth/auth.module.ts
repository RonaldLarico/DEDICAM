import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfigFactory } from './config/jwt.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/githu.strategy';
import { LinkedInStrategy } from './strategies/linkedin.strategy';
import { XStrategy } from './strategies/x.strategy';

@Module({
  imports: [
    PassportModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfigFactory,
    }),
  ],

  providers: [
    AuthService,
    PrismaService,
    GoogleStrategy,
    GithubStrategy,
    //LinkedInStrategy,
    //XStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
