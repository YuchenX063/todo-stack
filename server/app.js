const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');

const app = express();

app.use(favicon('favicon.ico'));
app.use(cors({origin:'*'})); // cross origin resource sharing

app.use(express.json()); // parse requests of content-type - application/json

require('./routes')(app);

module.exports = app;