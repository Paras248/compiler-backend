const express = require('express');
const Router = express.Router();
const compile = require('../controllers/compileController');
const { getQuotes } = require('../controllers/quotesController');

Router.route('/run').post(compile);
Router.route('/quotes').get(getQuotes);

module.exports = Router;
