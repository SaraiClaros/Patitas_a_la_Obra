const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234567Edith.',
  database: 'PatitaObra'
});

module.exports = pool;
