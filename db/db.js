const knex = require('knex')({
   client: 'pg',
   version: '11.5',
   connection: {
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      ssl: process.env.production == 'true'
   }
});

module.exports = knex