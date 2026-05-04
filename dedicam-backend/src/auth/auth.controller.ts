import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { LinkedInAuthGuard } from './guards/linkedin-auth.guard';
import { XAuthGuard } from './guards/x-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ---------------- GOOGLE ----------------
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req: any) {
    return this.authService.oauthLogin({
      ...req.user,
      provider: 'google',
    });
  }

  // ---------------- GITHUB ----------------
  @Get('github')
  @UseGuards(GithubAuthGuard)
  githubAuth() {}

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  githubCallback(@Req() req: any) {
    return this.authService.oauthLogin({
      ...req.user,
      provider: 'github',
    });
  }

  // ---------------- LINKEDIN ----------------
  @Get('linkedin')
  @UseGuards(LinkedInAuthGuard)
  linkedinAuth() {}

  @Get('linkedin/callback')
  @UseGuards(LinkedInAuthGuard)
  linkedinCallback(@Req() req: any) {
    return this.authService.oauthLogin({
      ...req.user,
      provider: 'linkedin',
    });
  }

  // ---------------- X (TWITTER) ----------------
  @Get('x')
  @UseGuards(XAuthGuard)
  xAuth() {}

  @Get('x/callback')
  @UseGuards(XAuthGuard)
  xCallback(@Req() req: any) {
    return this.authService.oauthLogin({
      ...req.user,
      provider: 'x',
    });
  }

  // ---------------- REGISTER ----------------
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  // ---------------- LOGIN ----------------
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
