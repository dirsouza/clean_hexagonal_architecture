import { BadRequestError, InternalServerError } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';

import { Logger } from '@/config/logger.config';
import { UserDTO } from '@/core/dto/user.dto';
import { UserCreateInput } from '@/core/interface/user.interface';
import { CryptProvider } from '@/core/provider/crypt.provider';
import { IdProvider } from '@/core/provider/id.provider';
import { userRepository } from '@/core/repository/user.repository';
import { UseCase } from '@/core/use-case/';

@injectable()
export class UserCreateService implements UseCase<UserCreateInput, UserDTO> {
  private readonly logger = Logger.getLogger(UserCreateService);

  constructor(
    @inject('UserRepository')
    private readonly userRepo: userRepository,
    @inject('IdProvider')
    private readonly idProvider: IdProvider,
    @inject('CryptProvider')
    private readonly cryptProvider: CryptProvider
  ) {}

  async execute(input: UserCreateInput): Promise<UserDTO> {
    try {
      const user = await this.userRepo.findByEmail(input.email);
      if (user) throw new BadRequestError('User already exists');

      const id = this.idProvider.uuid();
      const password = await this.cryptProvider.hash(input.password);
      const newUser = await this.userRepo.create({ ...input, id, password });
      return new UserDTO(newUser);
    } catch (error) {
      this.logger.error(error, '[execute] Error:');
      throw new InternalServerError('User creation failed');
    }
  }
}
