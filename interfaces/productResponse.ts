import { Product } from "./product";

export interface CreateProductResponse {
  message: string;
}

export interface DeleteProductResponse {
  message: string;
}

export interface GetProductResponse {
  data: Product;
}

export interface ListProductsResponse {
  data: Product[];
}

export interface UpdateProductResponse {
  message: string;
}
