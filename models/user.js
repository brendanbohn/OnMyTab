var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    verpassword: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;