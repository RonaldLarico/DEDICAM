export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly username: string | null,
    public readonly password: string | null,
    public readonly firstName: string | null,
    public readonly lastName: string | null,
    public readonly avatarUrl: string | null,
    public readonly role: string,
    public readonly isVerified: boolean,
    public readonly stripeCustomerId: string | null,
    public readonly settings: any | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}