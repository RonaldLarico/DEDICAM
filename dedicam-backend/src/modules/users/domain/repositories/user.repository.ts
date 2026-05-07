import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: any): Promise<User>;
  abstract update(id: number, data: any): Promise<User>;
  abstract delete(id: number): Promise<User>;
}
