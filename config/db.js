const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'e1m2o3n4',
    database: 'students_db',
    port: 5000
})

module.exports = mySqlPool;