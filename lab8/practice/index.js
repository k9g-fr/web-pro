// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database'); 

// static resourse & template engine
// static resourse
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');
// For parsing form data
app.use(express.urlencoded({ extended: true })); 

app.get('/', function(req, res){
  res.send(`<a href="/create">Create table</a><br>
    <a href="/insert">Insert data to table</a><br>
    <a href="/showdata">Show data</a><br>
    <a href="/form">Form</a>
    `);
});
// routing 
app.get('/create',  (req, res) => {
    // Create table in MySQL database
    const sql = `CREATE TABLE IF NOT EXISTS instructor(
    ID varchar(5) not null,
    name varchar(20) not null,
    dept_name varchar(20) not null,
    salary float,
    PRIMARY KEY (ID)
    ); `;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });
    // then, Insert data into the table    

});

app.get('/insert',  (req, res) => {
    // Create table in MySQL database
    const sql = `
    insert ignore into instructor(ID, name, dept_name, salary)
    values('10101', 'Srinivasan', 'Comp. Sci.', 65000), 
    ('12121', 'Wu', 'Finance', 90000),
    ('15151', 'Mozart', 'Music', 40000),
    ('22222', 'Einstein', 'Physics', 95000),
    ('32343', 'El Said', 'History', 60000),
    ('33456', 'Gold', 'Physics', 87000),
    ('45565', 'Katz', 'Comp. Sci.', 75000),
    ('58583', 'Califieri', 'History', 62000),
    ('76543', 'Singh', 'Finance', 80000),
    ('76766', 'Crick', 'Biology', 72000),
    ('83821', 'Brandt', 'Comp. Sci.', 92000),
    ('98345', 'Kim', 'Elec. Eng.', 80000)
    `;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table data inserted into table");
        res.send("Table data inserted into table");
    });
});

app.get('/showdata', (req, res) => {

    const sql = 'SELECT * FROM instructor;';
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('show', { data: result });
    });
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', (req, res) => {
    // read data from query string 
    const { id, name, deptname, salary } = req.query;
    const insertSql = "INSERT INTO instructor (ID, name, dept_name, salary) VALUES (?,?,?,?)";
    
    conn.query(insertSql,[id, name, deptname, salary], (err, result) =>{
        if (err) throw err;
        console.log("Data inserted");
        res.send("Data inserted");
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 