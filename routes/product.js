const fs = require('fs');
const express = require('express');

const router = express.Router();

const dataString = fs.readFileSync(`${__dirname}/../data/data.json`, 'utf-8');
const data = JSON.parse(dataString);

function getProduct(id) {
  return data.find((product) => +product.id === +id);
}

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = getProduct(id);
  if (product) {
    res.render('product', { title: 'Product', product });
  } else {
    console.log('Not found');
  }
});

module.exports = router;
