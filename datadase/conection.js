const db = require("mysql2");
const dotenv = require("dotenv").config();
const con = db.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    port: process.env.MYSQL_ADDON_PORT,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB
});

con.connect(function (err) {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("Connected to the database!");

    const sql = `CREATE TABLE IF NOT EXISTS employees (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        address VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255),
        gender VARCHAR(50),
        password VARCHAR(255)
    )`;
        con.query(sql, function (err, result) {
        if (err) {
            console.error("Error creating table:", err.message);
            return;
        }
        console.log("Table created or already exists.");
    });
});

// Promise-based query function
const query = (sql) => {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { query };