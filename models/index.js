var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/on_my_tab");
module.exports.User = require("./user.js");