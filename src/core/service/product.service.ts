import { injectable } from 'tsyringe';

import { ProductDTO } from '@/core/dto/product.dto';
import { ProductModel } from '@/core/model/product.model';
import { UseCase } from '@/core/use-case';

@injectable()
export class ProductService implements UseCase<undefined, ProductDTO[]> {
  async execute(): Promise<ProductDTO[]> {
    const products: ProductModel[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ];
    return products.map(product => new ProductDTO(product));
  }
}
