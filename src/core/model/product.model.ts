export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}
