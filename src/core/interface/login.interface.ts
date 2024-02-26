import { UserCreateInput } from '@/core/interface/user.interface';

export interface LoginInput extends Omit<UserCreateInput, 'id' | 'name'> {}
