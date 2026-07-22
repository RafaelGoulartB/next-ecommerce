exports.up = function (knex) {
  return knex.schema.table('review', function (table) {
    table
      .string('user_id')
      .nullable()
      .references('id')
      .inTable('user')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');

    table.unique(['user_id', 'product_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.table('review', function (table) {
    table.dropUnique(['user_id', 'product_id']);
    table.dropColumn('user_id');
  });
};
