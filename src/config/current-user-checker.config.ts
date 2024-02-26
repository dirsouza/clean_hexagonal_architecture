import { Action } from 'routing-controllers';
import { container } from 'tsyringe';

import { UserDTO } from '@/core/dto/user.dto';
import { userRepository } from '@/core/repository/user.repository';

export async function currentUserChecker(
  action: Action
): Promise<UserDTO | null> {
  if (!action.request.userEmail) return null;

  const userRepo = container.resolve<userRepository>('UserRepository');
  const user = await userRepo.findByEmail(action.request.userEmail);
  if (!user) return null;

  return new UserDTO(user);
}
