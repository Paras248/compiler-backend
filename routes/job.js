const express = require('express');
const Router = express.Router();
const compile = require('../controllers/compileController');
const checkStatus = require('../controllers/statusController');

Router.route('/run').post(compile);
Router.route('/status').get(checkStatus);

module.exports = Router;
