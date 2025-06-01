const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Edith1234567.',
  database: 'patitas'
});

module.exports = pool;
