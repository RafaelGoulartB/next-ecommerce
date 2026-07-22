import { connection } from '../db/connection';

const sortableFields = {
  rating: 'product.rating',
  price: 'product.price',
  name: 'product.name',
  created_at: 'product.created_at',
};

function parseSort(sort) {
  const requestedSort = Array.isArray(sort) ? sort[0] : sort;
  const field = sortableFields[requestedSort?.field] || sortableFields.rating;
  const order = String(requestedSort?.order || 'ASC').toUpperCase() === 'DESC'
    ? 'DESC'
    : 'ASC';

  return { field, order };
}

export async function listProducts({ sort, category, search }) {
  const { field, order } = parseSort(sort);
  const query = connection('product').select('product.*');

  if (search?.trim()) {
    const searchTerm = `%${search.trim()}%`;
    query.where(function searchProducts() {
      this.where('product.name', 'like', searchTerm).orWhere(
        'product.description',
        'like',
        searchTerm
      );
    });
  }

  if (category) {
    query
      .join(
        'product_category',
        'product.id',
        '=',
        'product_category.product_id'
      )
      .join('category', 'category.id', '=', 'product_category.category_id')
      .where('category.name', category)
      .distinct();
  }

  return query.orderBy(field, order);
}

export async function findProduct({ id }) {
  return connection('product').where('product.id', id).first();
}

export async function findProductCategories({ productId }) {
  return connection('category')
    .join(
      'product_category',
      'category.id',
      '=',
      'product_category.category_id'
    )
    .where('product_category.product_id', productId)
    .select('category.*')
    .distinct();
}

export async function findRelatedProducts({ productId }) {
  const categoryIds = await connection('product_category')
    .where('product_id', productId)
    .pluck('category_id');

  if (!categoryIds.length) return [];

  return connection('product_category')
    .join('product', 'product.id', '=', 'product_category.product_id')
    .whereIn('product_category.category_id', categoryIds)
    .whereNot('product.id', productId)
    .select('product.*')
    .distinct()
    .orderBy('product.rating', 'desc')
    .limit(4);
}

export async function findProductsById({ id }) {
  if (!Array.isArray(id) || !id.length) return [];

  return connection('product').whereIn('id', id);
}

export async function CreateProduct(input, userId) {
  const newProduct = {
    name: input.name,
    description: input.description,
    img_url: input.img_url,
    price: parseFloat(input.price),
    rating: parseFloat(input.rating),
    created_at: Date.now(),
    updated_at: Date.now(),
    user_id: userId,
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

    return findProduct({ id: product_id });
  } catch (error) {
    await trx.rollback();

    throw new Error('Server side error to create a new product');
  }
}

export async function DeleteProduct({ id, userId }) {
  await connection('product').where({ id, user_id: userId }).del();

  return true;
}

export async function UpdateProduct(id, input, userId) {
  const newProduct = {
    name: input.name,
    description: input.description,
    img_url: input.img_url,
    price: parseFloat(input.price),
    rating: parseFloat(input.rating),
    updated_at: Date.now(),
  };

  await connection('product').where({ id, user_id: userId }).update(newProduct);

  return findProduct({ id });
}
