const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema ({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  }
});

UserSchema.pre('save', (next) => {
  const user = this;
  //use whichever user is being created
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    //save the hash that was created as the user's password
    next();
    //after saving the hash as the password, exit the middleware
  });
});

module.exports = mongoose.model('User', UserSchema);
