import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { UserCreateInput } from '@/core/interface/user.interface';
import { UserModel } from '@/core/model/user.model';
import { userRepository } from '@/core/repository/user.repository';

@injectable()
export class UserDBRepository implements userRepository {
  constructor(
    @inject('PrismaClient')
    private readonly db: PrismaClient
  ) {}

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.db.user.findUnique({ where: { email } });
  }

  async create(user: UserCreateInput): Promise<UserModel> {
    return this.db.user.create({ data: user });
  }
}
