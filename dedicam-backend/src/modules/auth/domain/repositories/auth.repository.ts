import { AuthEntity } from '../entities/auth.entity';
import { AccountEntity } from '../entities/account.entity';

export interface AuthRepository {
  findUserByEmail(email: string): Promise<AuthEntity | null>;

  createUser(data: {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    isVerified?: boolean;
  }): Promise<AuthEntity>;

  findAccount(
    provider: string,
    providerAccountId: string,
  ): Promise<AccountEntity | null>;

  createAccount(data: {
    userId: number;
    provider: string;
    providerAccountId: string;
  }): Promise<void>;
}