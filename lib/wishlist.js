import { connection } from '../db/connection';

export async function listWishlist({ userId, db = connection }) {
  return db('wishlist_item')
    .join('product', 'product.id', '=', 'wishlist_item.product_id')
    .where('wishlist_item.user_id', userId)
    .select('product.*')
    .orderBy('wishlist_item.created_at', 'asc');
}

export async function toggleWishlist({ userId, productId }) {
  const product = await connection('product').where('id', productId).first();
  if (!product) throw new Error('Product not found');

  const existing = await connection('wishlist_item')
    .where({ user_id: userId, product_id: productId })
    .first();

  if (existing) {
    await connection('wishlist_item').where('id', existing.id).del();
  } else {
    await connection('wishlist_item').insert({
      user_id: userId,
      product_id: productId,
      created_at: Date.now(),
    });
  }

  return listWishlist({ userId });
}

export async function mergeGuestWishlist({ userId, productIds }) {
  const ids = [...new Set((Array.isArray(productIds) ? productIds : []).map(String))];
  for (const productId of ids) {
    const product = await connection('product').where('id', productId).first();
    if (!product) continue;
    const existing = await connection('wishlist_item')
      .where({ user_id: userId, product_id: productId })
      .first();
    if (!existing) {
      await connection('wishlist_item').insert({
        user_id: userId,
        product_id: productId,
        created_at: Date.now(),
      });
    }
  }
  return listWishlist({ userId });
}
