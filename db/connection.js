const knex = require('knex');
const configuration = require('../knexfile');

let config;

if (process.env.NODE_ENV === 'test') config = configuration.test;
if (process.env.NODE_ENV === 'development') config = configuration.development;
if (process.env.NODE_ENV === 'production')
  config = {
    client: 'sqlite3',
    connection: {
      filename: `${__dirname}/db.sqlite`,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    useNullAsDefault: true,
  };

export const connection = knex(config);
