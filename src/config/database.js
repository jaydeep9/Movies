const { createPool } = require('mysql');

const pool = createPool({
    port: process.env.MYSQL_DB_PORT,
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME
});
module.exports = pool;
