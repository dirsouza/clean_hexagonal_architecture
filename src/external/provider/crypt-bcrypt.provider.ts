import * as bcrypt from 'bcrypt';
import { injectable } from 'tsyringe';

import { CryptProvider } from '@/core/provider/crypt.provider';

@injectable()
export class CryptBcryptProvider implements CryptProvider {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compare(password: string, hash?: string): Promise<boolean> {
    if (!hash) return false;
    return bcrypt.compare(password, hash);
  }
}
