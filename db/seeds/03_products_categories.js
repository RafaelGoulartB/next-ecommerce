exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('product_category')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('product_category').insert([
        { product_id: 1, category_id: 7 },
        { product_id: 2, category_id: 9 },
        { product_id: 3, category_id: 9 },
        { product_id: 4, category_id: 1 },
        { product_id: 5, category_id: 3 },
        { product_id: 6, category_id: 4 },
        { product_id: 7, category_id: 10 },
        { product_id: 8, category_id: 1 },
        { product_id: 9, category_id: 3 },
        { product_id: 10, category_id: 7 },
        { product_id: 11, category_id: 7 },
        { product_id: 12, category_id: 6 },
      ]);
    });
};
