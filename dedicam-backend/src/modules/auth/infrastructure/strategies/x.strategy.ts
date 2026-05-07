import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from '@superfaceai/passport-twitter-oauth2';

@Injectable()
export class XStrategy extends PassportStrategy(Strategy, 'x') {
  constructor() {
    super({
      clientID: process.env.X_CLIENT_ID!,
      clientSecret: process.env.X_CLIENT_SECRET!,
      callbackURL: 'http://localhost:8000/auth/x/callback',
      clientType: 'confidential',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return {
      provider: 'x',
      email: profile.emails?.[0]?.value || null,
      firstName: profile.username,
      lastName: '',
      avatarUrl: profile.photos?.[0]?.value,
      providerAccountId: profile.id,
    };
  }
}