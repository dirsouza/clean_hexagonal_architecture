import { PrismaClient } from '@prisma/client';
import { container } from 'tsyringe';

import { envConfig } from '@/config/environment.config';
import { LoginService } from '@/core/service/login.service';
import { ProductService } from '@/core/service/product.service';
import { UserCreateService } from '@/core/service/user-create.service';
import { CryptBcryptProvider } from '@/external/provider/crypt-bcrypt.provider';
import { IdUuidProvider } from '@/external/provider/id-uuid.provider';
import { TokenJwtProvider } from '@/external/provider/token-jwt.provider';
import { UserDBRepository } from '@/external/repository/user-db.repository';

container.register('PrismaClient', {
  useValue: new PrismaClient({
    errorFormat: envConfig.NODE_ENV === 'development' ? 'pretty' : 'minimal'
  })
});

// Providers
container.register('IdProvider', {
  useClass: IdUuidProvider
});
container.register('CryptProvider', {
  useClass: CryptBcryptProvider
});
container.register('TokenProvider', {
  useClass: TokenJwtProvider
});

// Repositories
container.register('UserRepository', {
  useClass: UserDBRepository
});

// Services
container.register('UserCreateService', {
  useClass: UserCreateService
});
container.register('LoginService', {
  useClass: LoginService
});
container.register('ProductService', {
  useClass: ProductService
});
