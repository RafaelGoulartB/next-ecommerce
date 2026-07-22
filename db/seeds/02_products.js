const products = require('../catalog/products');

exports.seed = async function (knex) {
  // Reviews and category links reference products, so clear them first.
  await knex('review').del();
  await knex('product_category').del();
  await knex('product').del();

  const now = Date.now();

  await knex('product').insert(
    products.map(({ category, ...product }) => ({
      ...product,
      created_at: now,
      updated_at: now,
      user_id: '1',
    }))
  );
};
