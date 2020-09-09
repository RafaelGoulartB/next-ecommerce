const knex = require('knex');
const configuration = require('../knexfile');
const path = require('path');

let config;

if (process.env.NODE_ENV === 'test') config = configuration.test;
if (process.env.NODE_ENV === 'development') config = configuration.development;
if (process.env.NODE_ENV === 'production')
  config = {
    client: 'sqlite3',
    connection: {
      filename: '../db/db.sqlite',
    },
    migrations: {
      directory: '../db/migrations',
    },
    seeds: {
      directory: '../db/seeds',
    },
    useNullAsDefault: true,
  };

console.log(path.dirname(__filename));
console.log(__filename);
console.log(config);

export const connection = knex(config);
