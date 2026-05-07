export class AuthEntity {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly password: string | null,
    public readonly firstName: string | null,
    public readonly lastName: string | null,
    public readonly avatarUrl: string | null,
    public readonly isVerified: boolean,
    public readonly role: 'USER' | 'ADMIN' | 'SUPER_ADMIN',
  ) {}
}