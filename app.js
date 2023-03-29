const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/home'));
app.use('/product', require('./routes/product'));

module.exports = app;
