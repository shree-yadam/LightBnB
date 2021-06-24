const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = {
  query: (text, params, num_rows) => {
    return pool.query(text, params)
      .then(res => {
        if (num_rows === 1) {
          return res.rows[0];
        } else {
          return res.rows;
        }
      });
  },
}