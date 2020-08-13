import { connection } from '../db/connection';

export async function listProducts() {
  const products = await connection('product');

  return products;
}

export async function findProduct({ id }) {
  const product = await connection('product').whereRaw('id = ?', [id]).first();

  return product;
}

export async function createProduct(product) {}

export async function deleteProduct({ id }) {}

export async function updateProduct() {}
