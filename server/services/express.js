const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const route = require('../route');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('client/public'));

//Load every routes
route(app);


module.exports = app;
