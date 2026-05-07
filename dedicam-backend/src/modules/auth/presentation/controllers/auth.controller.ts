import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';

import { RegisterUseCase } from '../../application/use-cases/register.usecase';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { OAuthUseCase } from '../../application/use-cases/oauth.usecase';

import { RegisterDto } from '../../application/dto/register.dto';
import { LoginDto } from '../../application/dto/login.dto';

import { GoogleAuthGuard } from '../../infrastructure/guards/google-auth.guard';
import { GithubAuthGuard } from '../../infrastructure/guards/github-auth.guard';
import { LinkedInAuthGuard } from '../../infrastructure/guards/linkedin-auth.guard';
import { XAuthGuard } from '../../infrastructure/guards/x-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly oauthUseCase: OAuthUseCase,
  ) {}

  // ---------------- GOOGLE ----------------
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req) {
    console.log('CALLBACK HIT');
    return await this.oauthUseCase.execute({
      ...req.user,
      provider: 'google',
    });
  }

  // ---------------- GITHUB ----------------
  @Get('github')
  @UseGuards(GithubAuthGuard)
  githubAuth() {
    return;
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(@Req() req) {
    return await this.oauthUseCase.execute({
      ...req.user,
      provider: 'github',
    });
  }

  // ---------------- LINKEDIN ----------------
  @Get('linkedin')
  @UseGuards(LinkedInAuthGuard)
  linkedinAuth() {
    return;
  }

  @Get('linkedin/callback')
  @UseGuards(LinkedInAuthGuard)
  async linkedinCallback(@Req() req) {
    return await this.oauthUseCase.execute({
      ...req.user,
      provider: 'linkedin',
    });
  }

  // ---------------- X (TWITTER) ----------------
  @Get('x')
  @UseGuards(XAuthGuard)
  xAuth() {
    return;
  }

  @Get('x/callback')
  @UseGuards(XAuthGuard)
  async xCallback(@Req() req) {
    return await this.oauthUseCase.execute({
      ...req.user,
      provider: 'x',
    });
  }

  // ---------------- REGISTER ----------------
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.registerUseCase.execute(body);
  }

  // ---------------- LOGIN ----------------
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    const result = await this.loginUseCase.execute(body);
    return result;
  }
}
