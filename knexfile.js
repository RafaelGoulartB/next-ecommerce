// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/db.sqlite',
    },
    migrations: {
      directory: './db/migrations',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './db/test.sqlite',
    },
    migrations: {
      directory: './db/migrations',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'sqlite3',
    connection: {
<<<<<<< HEAD
      filename: `${__dirname}/db/db.sqlite`,
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
=======
      filename: './db/db.sqlite',
    },
    migrations: {
      directory: './db/migrations',
>>>>>>> efafd7b79cd19babcb613edb4145a3d74eaaa5a4
    },
    useNullAsDefault: true,
  },
};
