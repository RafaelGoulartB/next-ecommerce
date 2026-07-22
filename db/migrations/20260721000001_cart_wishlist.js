exports.up = async function (knex) {
  await knex.schema.createTable('cart_item', function (table) {
    table.increments('id').primary();
    table.string('user_id').notNullable().references('id').inTable('user').onDelete('CASCADE');
    table.integer('product_id').notNullable().references('id').inTable('product').onDelete('CASCADE');
    table.integer('quantity').notNullable().defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    table.unique(['user_id', 'product_id']);
    table.index(['user_id']);
  });

  await knex.schema.createTable('wishlist_item', function (table) {
    table.increments('id').primary();
    table.string('user_id').notNullable().references('id').inTable('user').onDelete('CASCADE');
    table.integer('product_id').notNullable().references('id').inTable('product').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.unique(['user_id', 'product_id']);
    table.index(['user_id']);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('wishlist_item');
  await knex.schema.dropTableIfExists('cart_item');
};
