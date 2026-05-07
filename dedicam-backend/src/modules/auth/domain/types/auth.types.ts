import { UserRole } from '../enums/roles.enum';

export type AuthUser = {
  id: number;
  email: string;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  role: UserRole;
  isVerified: boolean;
};

export type AuthAccount = {
  id: number;
  userId: number;
  provider: string;
  providerAccountId: string;
};

export type CreateUserInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type CreateAccountInput = {
  userId: number;
  provider: string;
  providerAccountId: string;
};