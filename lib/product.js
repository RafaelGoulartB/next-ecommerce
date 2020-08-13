import { connection } from '../db/connection';
import { parse } from 'cookie';

export async function listProducts() {
  const products = await connection('product');

  return products;
}

export async function findProduct({ id }) {
  const product = await connection('product').whereRaw('id = ?', [id]).first();

  return product;
}

export async function CreateProduct({
  name,
  description,
  img_url,
  price,
  rating,
  category_id,
}) {
  const trx = await db.transaction();
  try {
    const insertedProductId = await trx('product').insert({
      name,
      description,
      img_url,
      price: parseFloat(price),
      rating: parseFloat(rating),
    });
    const product_id = insertedProductId[0];

    await trx('product_category').insert({
      product_id,
      category_id,
    });

    await trx.commit();

    const createdProduct = await findProduct({ id: product_id });

    return createdProduct;
  } catch (error) {
    await trx.rollback();

    return undefined;
  }
}

export async function DeleteProduct({ id }) {
  await connection('product').whereRaw('id = ?', [id]).del();

  return true;
}

export async function UpdateProduct() {}
