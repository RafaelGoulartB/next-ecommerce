const knex = require('knex');
const configuration = require('../knexfile');

let config;

if (process.env.NODE_ENV === 'test') config = configuration.test;
if (process.env.NODE_ENV === 'development') config = configuration.development;
if (process.env.NODE_ENV === 'production') config = configuration.production;

export const connection = knex(config);
