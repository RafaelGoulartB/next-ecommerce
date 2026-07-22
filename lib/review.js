import { connection } from '../db/connection';

export async function listReviewsByProduct({ productId }) {
  return connection('review')
    .where('product_id', productId)
    .select(
      'id',
      'product_id',
      'author_name',
      'rating',
      'title',
      'comment',
      'verified_purchase',
      'created_at'
    )
    .orderBy('created_at', 'desc');
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
