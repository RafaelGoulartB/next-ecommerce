exports.up = function (knex) {
  return knex.schema.createTable('category', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('label').notNullable();
    table.string('md_icon').notNullable();
    table.timestamp('created_at').defaultTo('now()').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('category');
};
