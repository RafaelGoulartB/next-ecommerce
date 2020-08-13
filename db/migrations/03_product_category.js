exports.up = function (knex) {
  return knex.schema.createTable('product_category', function (table) {
    table.increments('id').primary();

    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('product')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .integer('category_id')
      .notNullable()
      .references('id')
      .inTable('category')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('product_category');
};
