import { InternalServerError, UnauthorizedError } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';

import { Logger } from '@/config/logger.config';
import { LoginDTO } from '@/core/dto/login.dto';
import { LoginInput } from '@/core/interface/login.interface';
import { CryptProvider } from '@/core/provider/crypt.provider';
import { TokenProvider } from '@/core/provider/token.provider';
import { userRepository } from '@/core/repository/user.repository';
import { UseCase } from '@/core/use-case';

@injectable()
export class LoginService implements UseCase<LoginInput, LoginDTO> {
  private readonly logger = Logger.getLogger(LoginService);

  constructor(
    @inject('UserRepository')
    private readonly userRepo: userRepository,
    @inject('CryptProvider')
    private readonly cryptProvider: CryptProvider,
    @inject('TokenProvider')
    private readonly tokenProvider: TokenProvider
  ) {}

  async execute(input: LoginInput): Promise<LoginDTO> {
    try {
      const user = await this.userRepo.findByEmail(input.email);
      const isValidPwd = await this.cryptProvider.compare(
        input.password,
        user?.password
      );
      if (!user || !isValidPwd) {
        throw new UnauthorizedError('Unauthorized user');
      }

      const token = this.tokenProvider.generate({
        id: user.id,
        name: user.name,
        email: user.email
      });
      return new LoginDTO(token);
    } catch (error) {
      this.logger.error(error, '[execute] Error:');
      if (error instanceof UnauthorizedError) throw error;
      throw new InternalServerError('User login failed');
    }
  }
}
