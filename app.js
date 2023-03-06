const express = require('express');
const cors = require('cors');

const app = express();

const job = require('./routes/job');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', job);

module.exports = app;
