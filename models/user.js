const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

//#####
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return user;
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
