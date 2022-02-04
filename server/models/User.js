const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },

  lastname: {
    type: String,
    minlength: 3,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: true,
    maxlength: 6,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
    minlength: 5,
  },
});

const User = mongoose.model("User", userSchema);

exports.User = User;