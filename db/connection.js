const knex = require('knex');
const configuration = require('../knexfile');

let config;

if (process.env.NODE_ENV === 'test') config = configuration.test;
if (process.env.NODE_ENV === 'development') config = configuration.development;
if (process.env.NODE_ENV === 'production') config = configuration.production;

const connectionConfig = { ...config };

if (connectionConfig.client === 'sqlite3') {
  connectionConfig.pool = {
    ...(connectionConfig.pool || {}),
    afterCreate(connectionInstance, done) {
      connectionInstance.run('PRAGMA foreign_keys = ON', done);
    },
  };
}

export const connection = knex(connectionConfig);
