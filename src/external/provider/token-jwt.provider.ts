import * as jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import { envConfig } from '@/config/environment.config';
import { TokenPayload } from '@/core/interface/auth.interface';
import { TokenProvider } from '@/core/provider/token.provider';

@injectable()
export class TokenJwtProvider implements TokenProvider {
  generate(payload: TokenPayload): string {
    return jwt.sign(payload, envConfig.JWT_SECRET, {
      expiresIn: envConfig.JWT_EXPIRES_IN
    });
  }

  verify(token: string): TokenPayload {
    return jwt.verify(token, envConfig.JWT_SECRET) as TokenPayload;
  }
}
