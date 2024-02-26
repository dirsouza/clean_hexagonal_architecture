import { injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { IdProvider } from '@/core/provider/id.provider';

@injectable()
export class IdUuidProvider implements IdProvider {
  uuid(): string {
    return uuid();
  }
}
