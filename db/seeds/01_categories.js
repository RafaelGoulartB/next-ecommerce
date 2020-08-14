exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('category')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        { name: 'computers', created_at: Date.now() },
        { name: 'mac', created_at: Date.now() },
        { name: 'laptop', created_at: Date.now() },
        { name: 'keyboard', created_at: Date.now() },
        { name: 'components', created_at: Date.now() },
        { name: 'speaker', created_at: Date.now() },
        { name: 'smartphone', created_at: Date.now() },
        { name: 'tv', created_at: Date.now() },
        { name: 'videogame', created_at: Date.now() },
        { name: 'watch', created_at: Date.now() },
      ]);
    });
};
