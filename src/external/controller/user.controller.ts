import { Body, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';

import { UserDTO } from '@/core/dto/user.dto';
import { UserCreateInput } from '@/core/interface/user.interface';
import { UseCase } from '@/core/use-case';
import { Validation } from '@/external/decorator/validation.decorator';
import { UserCreateSchema } from '@/external/schema/user-create.schema';

@JsonController('/v1/users')
export class UserController {
  private readonly userService: UseCase<UserCreateInput, UserDTO>;

  constructor() {
    this.userService = container.resolve('UserCreateService');
  }

  @Post()
  async create(
    @Body()
    @Validation({ schema: UserCreateSchema, type: 'body' })
    userInput: UserCreateInput
  ): Promise<UserDTO | undefined> {
    return this.userService.execute(userInput);
  }
}
