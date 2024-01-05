const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
// const db = require('./db/mysqlDB.sql')
const cors = require('cors');
const app = express();

app.use(cors());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root123',
  database: 'company',
  port: 3306
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});


app.use(bodyParser.json());


app.get('/strings', (req, res) => {
  connection.query('SELECT * FROM emp', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving strings');
    } else {
      res.json(results);
    }
  });
});

app.get('/string/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM emp WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving string');
    } else if (results.length === 0) {
      res.status(404).send('String not found');
    } else {
      res.json(results[0]);
    }
  });
});


app.post('/string', (req, res) => {
  const newString = req.body.string;
  connection.query('INSERT INTO emp (names) VALUES (?)', [newString], (err, results) => {
    if (err) {
      res.status(500).send('Error adding new string');
    } else {
      res.json({ id: results.insertId, mystring: newString });
    }
  });
});



app.put('/string/:id', (req, res) => {
  const id = req.params.id;
  const updatedString = req.body.string;
  connection.query('UPDATE emp SET names = ? WHERE id = ?', [updatedString, id], (err, results) => {
    if (err) {
      res.status(500).send('Error updating string');
    } else if (results.affectedRows === 0) {``
      res.status(404).send('String not found');
    } else {
      res.json({ id: parseInt(id), mystring: updatedString });
    }
  });
});


app.delete('/string/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM emp WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting string');
    } else if (results.affectedRows === 0) {
      res.status(404).send('String not found');
    } else {
      res.send('String deleted successfully');
    }
  });
});

// Start the server
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});