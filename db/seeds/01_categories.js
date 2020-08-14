exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('category')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {
          id: 1,
          name: 'computers',
          label: 'Computers',
          md_icon: 'MdDesktopWindows',
          created_at: Date.now(),
        },
        {
          id: 2,
          name: 'mac',
          label: 'Apple Computers',
          md_icon: 'MdDesktopMac',
          created_at: Date.now(),
        },
        {
          id: 3,
          name: 'laptop',
          label: 'Laptop',
          md_icon: 'MdLaptop',
          created_at: Date.now(),
        },
        {
          id: 4,
          name: 'keyboard',
          label: 'Keyboards',
          md_icon: 'MdKeyboard',
          created_at: Date.now(),
        },
        {
          id: 5,
          name: 'components',
          label: 'Computer Components',
          md_icon: 'MdMemory',
          created_at: Date.now(),
        },
        {
          id: 6,
          name: 'speaker',
          label: 'Accessories',
          md_icon: 'MdSpeaker',
          created_at: Date.now(),
        },
        {
          id: 7,
          name: 'smartphone',
          label: 'Cell Phone',
          md_icon: 'MdSmartphone',
          created_at: Date.now(),
        },
        {
          id: 8,
          name: 'tv',
          label: 'TV & Video',
          md_icon: 'MdTv',
          created_at: Date.now(),
        },
        {
          id: 9,
          name: 'videogame',
          label: 'Game Console',
          md_icon: 'MdVideogameAsset',
          created_at: Date.now(),
        },
        {
          id: 10,
          name: 'watch',
          label: 'Watch',
          md_icon: 'MdWatch',
          created_at: Date.now(),
        },
      ]);
    });
};
