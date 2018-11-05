var mongoose = require('mongoose');
var bcrypt= require("bcrypt");

//Traveller schema
var UsersSchema= new mongoose.Schema({
    username: {
        type : String
    },
    type:{
        type: String
    },
    password: {
        type : String,
        
    },
    lastname: {
        type : String
    },
    firstname:{
        type : String
    },
    location:{
        type : String
    },
    about:{
        type : String
    },
    gender: {
        type : String
    },
    phone: {
        type : String
    },
    company: {
        type : String
    },
    languages: {
        type : String
    }

});

// Saves the user's password hashed (plain text password storage is not good)
UsersSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });

// Create method to compare password input to password saved in database
UsersSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  

var Users = mongoose.model('users',UsersSchema);
    

module.exports = {Users};