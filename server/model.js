const mongoose = require("mongoose");
const db = require("./db.js");
const Schema = mongoose.Schema;

const User = new Schema({
  first_name: String,
  surname: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  city: String,
  country: String,
  age: Number,
  joined_at: Number
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
