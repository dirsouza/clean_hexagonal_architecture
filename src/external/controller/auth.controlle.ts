import { Body, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';

import { LoginDTO } from '@/core/dto/login.dto';
import { LoginInput } from '@/core/interface/login.interface';
import { UseCase } from '@/core/use-case';
import { Validation } from '@/external/decorator/validation.decorator';
import { LoginSchema } from '@/external/schema/login.schema';

@JsonController('/v1/auth')
export class AuthController {
  private readonly loginService: UseCase<LoginInput, LoginDTO>;

  constructor() {
    this.loginService = container.resolve('LoginService');
  }

  @Post('/login')
  async login(
    @Body()
    @Validation({ schema: LoginSchema, type: 'body' })
    loginInput: LoginInput
  ): Promise<LoginDTO> {
    return this.loginService.execute(loginInput);
  }
}
