const fs = require('fs');
const express = require('express');

const router = express.Router();

const dataString = fs.readFileSync(`${__dirname}/../data/data.json`, 'utf-8');
const data = JSON.parse(dataString);

router.get('/', (req, res) => {
  res.render('home', { title: 'Home', products: data });
});

module.exports = router;
