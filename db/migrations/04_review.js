exports.up = function (knex) {
  return knex.schema.createTable('review', function (table) {
    table.increments('id').primary();

    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('product')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('author_name').notNullable();
    table.integer('rating').notNullable();
    table.string('title').notNullable();
    table.text('comment').notNullable();
    table.boolean('verified_purchase').notNullable().defaultTo(true);
    table.timestamp('created_at').defaultTo('now()').notNullable();

    table.index(['product_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('review');
};
