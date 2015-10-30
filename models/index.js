var mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/OnMyTab' // plug in the db name you've been using
);
module.exports.User = require("./user.js");
module.exports.Comment = require("./comment.js");