import { User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(user: PrismaUser): User {
    return new User(
      user.id,
      user.email,
      user.username,
      user.password,
      user.firstName,
      user.lastName,
      user.avatarUrl,
      user.role,
      user.isVerified,
      user.stripeCustomerId,
      user.settings,
      user.createdAt,
      user.updatedAt,
    );
  }

  static toDomainList(users: PrismaUser[]): User[] {
    return users.map(this.toDomain);
  }
}