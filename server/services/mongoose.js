const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGO_HOST);

require('../model/MovieModel');
