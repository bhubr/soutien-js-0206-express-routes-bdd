require('dotenv').config();
const express = require('express');
const connection = require('./connection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('request was sent');

app.get('/api/links', (req, res) => {

  connection.query('SELECT id, title, url FROM link', (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      })
    }
    res.json(results) //res.status(200).json(results)
    console.log(results); // inutile ce console log maintenant non ?
  });
})

app.post('/api/links', (req, res) => {

  const formData = req.body;

  connection.query('INSERT INTO link SET ?', [formData], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      });
    }

    const { insertId } = results;
    // SELECT here
    connection.query('SELECT * FROM link WHERE id = ?', [insertId], (err2, records) => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql
        });
      }
      res.status(201).json(records[0]);
    });
  });
});




app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('y\'a une error')
  }
  console.log(`bisous body parser ${process.env.PORT}`)
})



