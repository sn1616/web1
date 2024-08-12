const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'banner_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Routes
app.get('/api/banner', (req, res) => {
    db.query('SELECT * FROM banner ORDER BY id DESC LIMIT 1', (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.post('/api/banner', (req, res) => {
    const { description, timer, link } = req.body;
    db.query('INSERT INTO banner (description, timer, link) VALUES ("dec1", 1,"https://www.amazon.com/")', [description, timer, link], (err, results) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});