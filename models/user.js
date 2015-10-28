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
        password: hash
      }, callback);
    });
  });
};

// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
 // find user by email entered at log in
 this.findOne({email: email}, function (err, foundUser) {
   console.log(foundUser);

   // throw error if can't find user
   if (!foundUser) {
     callback('No user with ' + email, null);  // better error structures are available, but a string is good enough for now
   // if we found a user, check if password is correct
   } else if (foundUser.checkPassword(password)) {
     callback(null, foundUser);
   }
 });
};

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);
module.exports = User;