const pool = require('../config/database');

function checkConnection(){
  return new Promise((resolve, reject) => {
    pool.query('SELECT now()', function (err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  });
}

module.exports = checkConnection;
