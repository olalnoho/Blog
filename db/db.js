const knex = require('knex')({
   client: 'pg',
   version: '11.5',
   connection: {
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: 'localhost',
      user: 'duh'
   }
});

module.exports = knex