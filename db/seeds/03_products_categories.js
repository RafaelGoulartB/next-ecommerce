const products = require('../catalog/products');

exports.seed = async function (knex) {
  const categories = await knex('category').select('id', 'name');
  const categoryIds = categories.reduce((result, category) => {
    result[category.name] = category.id;
    return result;
  }, {});

  const links = products.map((product) => {
    const categoryId = categoryIds[product.category];

    if (!categoryId) {
      throw new Error(`Unknown category in product seed: ${product.category}`);
    }

    return {
      product_id: product.id,
      category_id: categoryId,
    };
  });

  await knex('product_category').del();
  await knex('product_category').insert(links);
};
