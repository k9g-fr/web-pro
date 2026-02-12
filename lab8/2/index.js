const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const conn = require('./database');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM Users ORDER BY id';
    conn.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Database Error");
        }
        res.render('index', { users: results });
    });
});

app.post('/register', (req, res) => {
    const { username, password, email, firstname, lastname, age, address, phone } = req.body;
    
    const sql = `INSERT INTO Users 
                (username, password, email, firstname, lastname, age, address, phone) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [username, password, email, firstname, lastname, age, address, phone];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.send("Error inserting data: " + err.message);
        }
        console.log("Register successful!");
        res.redirect('/'); //
    });
});

app.get('/signin', (req, res) => {
    res.render('signin', { message: null, userData: null });
});

app.post('/signin', (req, res) => {
    const { identity, password } = req.body;
    const sql = "SELECT * FROM Users WHERE username = ? OR email = ?";
    
    conn.query(sql, [identity, identity], (err, results) => {
        if (err) return res.send("Error: " + err.message);

        if (results.length === 0) {
            return res.render('signin', { 
                message: "User account not found", 
                userData: null 
            });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.render('signin', { 
                message: "Incorrect password", 
                userData: null 
            });
        }

        res.render('signin', { 
            message: "Sign-in successful!", 
            userData: user 
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});