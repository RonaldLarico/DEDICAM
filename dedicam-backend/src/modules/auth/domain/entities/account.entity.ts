import { AuthEntity } from './auth.entity';

export class AccountEntity {
  constructor(
    public readonly id: number,
    public readonly provider: string,
    public readonly providerAccountId: string,
    public readonly user: AuthEntity,
  ) {}
}