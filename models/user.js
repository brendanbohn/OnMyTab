var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10); 

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
});

UserSchema.statics.createSecure = function (email, password, callback) {

var UserModel = this;

  bcrypt.genSalt(function (err, salt) {
    console.log('salt: ', salt);  // changes every time
    bcrypt.hash(password, salt, function (err, hash) {

      UserModel.create({
        email: email,
        passwordDigest: hash
      }, callback);
    });
  });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;