import { UserCreateInput } from '@/core/interface/user.interface';
import { UserModel } from '@/core/model/user.model';

export interface userRepository {
  findByEmail(email: string): Promise<UserModel | null>;
  create(user: UserCreateInput): Promise<UserModel>;
}
