const fs = require('fs');
const express = require('express');

const router = express.Router();

function getProducts() {
  const dataString = fs.readFileSync(`${__dirname}/../data/data.json`, 'utf-8');
  return JSON.parse(dataString);
}

router.get('/', (_, res) => {
  res.render('home', { title: 'Home', products: getProducts() });
});

module.exports = router;
