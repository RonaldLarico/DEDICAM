import { ConfigService } from '@nestjs/config';
import type { JwtModuleOptions } from '@nestjs/jwt';
import type { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';

export const jwtConfigFactory = (config: ConfigService): JwtModuleOptions => {
  const secret = config.getOrThrow<string>('JWT_SECRET');

  const expiresInRaw = config.getOrThrow<string>('JWT_EXPIRES_IN');

  const expiresIn: SignOptions['expiresIn'] = /^\d+$/.test(expiresInRaw)
    ? Number(expiresInRaw)
    : (expiresInRaw as StringValue);

  return {
    secret,
    signOptions: {
      expiresIn,
    },
  };
};
