const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  const cryptoPassword = await bcrypt.hashSync('123456', 10);
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: 1,
          name: 'admin',
          email: 'admin@admin.com',
          password: cryptoPassword,
          createdAt: Date.now(),
        },
        {
          id: 2,
          name: 'test',
          email: 'test@test.com',
          password: cryptoPassword,
          createdAt: Date.now(),
        },
      ]);
    });
};
