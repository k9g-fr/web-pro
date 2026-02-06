// database.js
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "webdev.it.kmitl.ac.th",
    user: "s67070237",
    password: "FOK49UXM45V", 
    database: "s67070237"
});

// open the MySQL connection
conn.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = conn;