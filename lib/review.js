import { connection } from '../db/connection';

export async function listReviewsByProduct({ productId }) {
  return connection('review')
    .where('product_id', productId)
    .select(
      'id',
      'product_id',
      'user_id',
      'author_name',
      'rating',
      'title',
      'comment',
      'verified_purchase',
      'created_at'
    )
    .orderBy('created_at', 'desc');
}

export async function findViewerReview({ productId, userId }) {
  return connection('review')
    .where({ product_id: productId, user_id: userId })
    .select(
      'id',
      'product_id',
      'user_id',
      'author_name',
      'rating',
      'title',
      'comment',
      'verified_purchase',
      'created_at'
    )
    .first();
}

async function hasPurchased({ productId, userId }) {
  const item = await connection('order_item')
    .join('orders', 'orders.id', '=', 'order_item.order_id')
    .where({ 'orders.user_id': userId, 'order_item.product_id': productId })
    .whereIn('orders.status', ['confirmed', 'processing', 'shipped', 'delivered'])
    .first('order_item.id');
  return Boolean(item);
}

function validateReviewInput({ rating, title, comment }) {
  const normalizedRating = Number(rating);
  if (!Number.isInteger(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  if (!String(title || '').trim()) throw new Error('Review title is required');
  if (!String(comment || '').trim()) throw new Error('Review comment is required');
  if (String(title).trim().length > 120) throw new Error('Review title is too long');
  if (String(comment).trim().length > 2000) throw new Error('Review comment is too long');
  return {
    rating: normalizedRating,
    title: String(title).trim(),
    comment: String(comment).trim(),
  };
}

export async function createReview({ productId, user, review }) {
  const input = validateReviewInput(review);
  const product = await connection('product').where('id', productId).first();
  if (!product) throw new Error('Product not found');

  const existing = await findViewerReview({ productId, userId: user.id });
  if (existing) throw new Error('You have already reviewed this product');

  const verifiedPurchase = await hasPurchased({ productId, userId: user.id });
  const [id] = await connection('review').insert({
    product_id: productId,
    user_id: user.id,
    author_name: user.name,
    rating: input.rating,
    title: input.title,
    comment: input.comment,
    verified_purchase: verifiedPurchase,
    created_at: Date.now(),
  });
  return connection('review').where('id', id).first();
}

export async function updateReview({ id, user, review }) {
  const input = validateReviewInput(review);
  const existing = await connection('review').where({ id, user_id: user.id }).first();
  if (!existing) throw new Error('Review not found');

  await connection('review').where('id', id).update({
    rating: input.rating,
    title: input.title,
    comment: input.comment,
  });
  return connection('review').where('id', id).first();
}

export async function deleteReview({ id, userId }) {
  const deleted = await connection('review').where({ id, user_id: userId }).del();
  if (!deleted) throw new Error('Review not found');
  return true;
}

export async function getReviewSummary({ productId }) {
  const reviews = await connection('review')
    .where('product_id', productId)
    .select('rating');

  const total = reviews.length;
  const average = total
    ? Number(
        (
          reviews.reduce((sum, review) => sum + Number(review.rating), 0) /
          total
        ).toFixed(1)
      )
    : 0;

  const distribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => Number(review.rating) === rating).length,
  }));

  return { average, total, distribution };
}
