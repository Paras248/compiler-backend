const express = require('express');
const Router = express.Router();
const compile = require('../controllers/compileController');

Router.route('/run').post(compile);

module.exports = Router;
