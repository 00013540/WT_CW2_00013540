const fs = require('fs');
const express = require('express');
const uniqid = require('uniqid');

const router = express.Router();

function getProducts() {
  const dataString = fs.readFileSync(`${__dirname}/../data/data.json`, 'utf-8');
  return JSON.parse(dataString);
}

function getProduct(id) {
  return getProducts().find((product) => product.id == id);
}

function saveProduct(products) {
  fs.writeFileSync(`${__dirname}/../data/data.json`, JSON.stringify(products));
}

router
  .route('/create')
  .get((_, res) => {
    res.render('product-create-update', { title: 'Product create' });
  })
  .post((req, res) => {
    const products = getProducts();
    products.push({
      id: uniqid(),
      ...req.body,
    });

    saveProduct(products);
    res.json({
      data: {
        status: true,
      },
    });
  });

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = getProduct(id);
  if (product) {
    res.render('product', {
      title: `${product.productName} ${product.image}`,
      product,
    });
  } else {
    res.render('error', { title: 'Not found' });
  }
});

router
  .route('/update/:id')
  .get((req, res) => {
    const id = req.params.id;
    const product = getProduct(id);
    if (product) {
      res.render('product-create-update', {
        title: `${product.productName} ${product.image}`,
        product: {
          ...product,
          price: parseInt(product.price),
        },
      });
    } else {
      res.render('error', { title: 'Not found' });
    }
  })
  .put((req, res) => {
    const products = getProducts();
    const index = products.findIndex((item) => item.id == req.params.id);
    products[index] = {
      id: req.params.id,
      ...req.body,
    };
    saveProduct(products);
    res.json({
      data: {
        status: true,
      },
    });
  });

router.delete('/delete/:id', (req, res) => {
  const products = getProducts();
  const index = products.findIndex((item) => item.id == req.params.id);
  const temp = products[index];
  products[index] = products[products.length - 1];
  products[products.length - 1] = temp;
  products.pop();
  saveProduct(products);
  res.json({
    data: {
      status: true,
    },
  });
});

module.exports = router;
