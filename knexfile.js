// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/db.sqlite',
    },
    migrations: {
      directory: './src/db/migrations',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/test.sqlite',
    },
    migrations: {
      directory: './src/db/migrations',
    },
    useNullAsDefault: true,
  },
};
