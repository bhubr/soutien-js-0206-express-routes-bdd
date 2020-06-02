require('dotenv').config();
const express = require('express');
const connection = require('./connection');

const app = express();



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

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error('y\'a une error')
  }
  console.log(`mon amour pour Francois est over ${process.env.PORT}`)
})



