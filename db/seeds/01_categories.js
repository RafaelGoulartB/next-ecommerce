exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('category')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        { id: 1, name: 'computers', created_at: Date.now() },
        { id: 2, name: 'mac', created_at: Date.now() },
        { id: 3, name: 'laptop', created_at: Date.now() },
        { id: 4, name: 'keyboard', created_at: Date.now() },
        { id: 5, name: 'components', created_at: Date.now() },
        { id: 6, name: 'speaker', created_at: Date.now() },
        { id: 7, name: 'smartphone', created_at: Date.now() },
        { id: 8, name: 'tv', created_at: Date.now() },
        { id: 9, name: 'videogame', created_at: Date.now() },
        { id: 10, name: 'watch', created_at: Date.now() },
      ]);
    });
};
