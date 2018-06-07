"use strict";

const pg = require("pg");
const pool = new pg.Pool({
    user: "postgres",
    password: "258963",
    host: "localhost",
    port: 5432,
    database: "ExpressShopDB",
    ssl: false
});


module.exports = pool;