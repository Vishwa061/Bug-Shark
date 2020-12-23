const Pool = require("pg").Pool;

// info to connect database and server
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "bugshark"
});

module.exports = pool;