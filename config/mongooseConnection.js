'use strict';
var mongoose = require("mongoose");
var config = require('config');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(config.get('mongoDB'), { useNewUrlParser: true , useUnifiedTopology: true});
// mongoose.connect(config.get('mongoDB'));
module.exports = mongoose;