import { Action } from 'routing-controllers';

import { TokenJwtProvider } from '@/external/provider/token-jwt.provider';

export async function authorizationChecker(action: Action): Promise<boolean> {
  const token = action.request.headers['authorization']?.replace('Bearer ', '');
  if (!token) return false;

  const tokenProvider = new TokenJwtProvider();
  const payload = tokenProvider.verify(token);
  if (!payload) return false;

  action.request['userEmail'] = payload.email;
  return true;
}
