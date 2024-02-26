import { UserModel } from '@/core/model/user.model';

export class UserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;

  constructor(user: UserModel) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
