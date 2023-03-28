const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

module.exports = app;
