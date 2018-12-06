const mongoose = require("mongoose");
const db = require("./db.js");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  joined_at: Number
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
