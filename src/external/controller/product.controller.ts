import {
  Authorized,
  CurrentUser,
  Get,
  JsonController
} from 'routing-controllers';
import { container } from 'tsyringe';

import { ProductDTO } from '@/core/dto/product.dto';
import { UserDTO } from '@/core/dto/user.dto';
import { UseCase } from '@/core/use-case';

@JsonController('/v1/products')
export class ProductController {
  private readonly productService: UseCase<undefined, ProductDTO>;

  constructor() {
    this.productService = container.resolve('ProductService');
  }

  @Get()
  @Authorized()
  async get(@CurrentUser() user: UserDTO): Promise<ProductDTO> {
    console.log(user);
    return this.productService.execute();
  }
}
