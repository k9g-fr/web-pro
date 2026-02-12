const express = require('express');
const path = require('path');
const conn = require('./database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM albums';
    conn.query(sql, (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).send("Database Error: " + err.message);
        }
        
        res.render('albums', { albums: results });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/albums`);
});