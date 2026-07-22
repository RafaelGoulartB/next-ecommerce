exports.up = async function (knex) {
  await knex.schema.createTable('orders', function (table) {
    table.string('id').primary();
    table.string('order_number').unique().notNullable();
    table.string('user_id').notNullable().references('id').inTable('user').onDelete('CASCADE');
    table.string('contact_name').notNullable();
    table.string('contact_email').notNullable();
    table.string('phone').nullable();
    table.string('status').notNullable().defaultTo('confirmed');
    table.decimal('subtotal').notNullable();
    table.decimal('total').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    table.index(['user_id', 'created_at']);
  });

  await knex.schema.createTable('order_item', function (table) {
    table.increments('id').primary();
    table.string('order_id').notNullable().references('id').inTable('orders').onDelete('CASCADE');
    table.integer('product_id').nullable().references('id').inTable('product').onDelete('SET NULL');
    table.string('product_name').notNullable();
    table.decimal('unit_price').notNullable();
    table.integer('quantity').notNullable();
    table.decimal('line_total').notNullable();
    table.index(['order_id']);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('order_item');
  await knex.schema.dropTableIfExists('orders');
};
