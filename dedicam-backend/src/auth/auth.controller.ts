import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER
  @Post('register')
  async register(
    @Body()
    body: RegisterDto,
  ) {
    const result = await this.authService.register(body);

    return result;
  }

  // LOGIN
  @Post('login')
  async login(
    @Body()
    body: LoginDto,
  ) {
    const result = await this.authService.login(body);

    return result;
  }
}
