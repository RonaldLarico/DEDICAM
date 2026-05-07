import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../domain/enums/roles.enum';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  stripeCustomerId?: string;

  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}
