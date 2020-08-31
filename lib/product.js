import { connection } from '../db/connection';

export async function listProducts(sortObj) {
  if (sortObj) {
    const sort = JSON.parse(JSON.stringify(sortObj[0]));

    const { field, order } = sort;

    const products = await connection('product').orderBy(field, order);
    return products;
  } else {
    const products = await connection('product');
    return products;
  }
}

export async function findProduct({ id }) {
  const product = await connection('product').whereRaw('id = ?', [id]).first();

  return product;
}

export async function CreateProduct(input) {
  const newProduct = {
    name: input.name,
    description: input.description,
    img_url: input.img_url,
    price: parseFloat(input.price),
    rating: parseFloat(input.rating),
    created_at: Date.now(),
    updated_at: Date.now(),
    user_id: '1',
  };

  const trx = await connection.transaction();
  try {
    const insertedProductId = await trx('product').insert(newProduct);
    const product_id = insertedProductId[0];

    await trx('product_category').insert({
      product_id,
      category_id: input.category_id,
    });

    await trx.commit();

    const createdProduct = await findProduct({ id: product_id });

    return createdProduct;
  } catch (error) {
    await trx.rollback();

    throw new Error('Server side error to create a new product');
  }
}

export async function DeleteProduct({ id }) {
  await connection('product').whereRaw('id = ?', [id]).del();

  return true;
}

export async function UpdateProduct(id, input) {
  const newProduct = {
    name: input.name,
    description: input.description,
    img_url: input.img_url,
    price: parseFloat(input.price),
    rating: parseFloat(input.rating),
    updated_at: Date.now(),
  };
  const updatedProduct = await connection('product')
    .whereRaw('id = ?', [id])
    .update(newProduct);

  const product = await findProduct({ id: updatedProduct });

  return product;
}
