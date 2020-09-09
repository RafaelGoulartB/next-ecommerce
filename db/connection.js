const knex = require('knex');
const configuration = require('../knexfile');

let config;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'test') config = configuration.test;
if (process.env.NODE_ENV === 'development') config = configuration.development;
if (process.env.NODE_ENV === 'production') config = configuration.development;

export const connection = knex(config);
