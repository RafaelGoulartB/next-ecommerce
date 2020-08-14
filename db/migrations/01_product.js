exports.up = function (knex) {
  return knex.schema.createTable('product', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('img_url').notNullable();
    table.decimal('price').notNullable();
    table.decimal('rating').notNullable();
    table.timestamp('created_at').defaultTo('now()').notNullable();
    table.timestamp('updated_at').defaultTo('now()').notNullable();

    table
      .string('user_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('product');
};
