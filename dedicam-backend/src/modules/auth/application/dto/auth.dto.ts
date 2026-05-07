export interface CreateAuthUserDTO {
  email: string;
  password?: string; // OAuth puede no tener password
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  isVerified?: boolean;
}