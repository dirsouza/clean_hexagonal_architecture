import { ProductModel } from '@/core/model/product.model';

export class ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;

  constructor(product: ProductModel) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
    this.deletedAt = product.deletedAt;
  }
}
