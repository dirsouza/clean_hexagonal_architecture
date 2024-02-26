import { TokenPayload } from '@/core/interface/auth.interface';

export interface TokenProvider {
  generate(payload: TokenPayload): string;
  verify(token: string): TokenPayload;
}
