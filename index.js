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

    // SELECT here

    const { insertId } = results;
    // plutôt privilégier un nouveau SELECT
    const insertedLink = { ...formData, id: insertId };
    res.status(201).json(insertedLink);
  });
});




app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('y\'a une error')
  }
  console.log(`bisous body parser ${process.env.PORT}`)
})



