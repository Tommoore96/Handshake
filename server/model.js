const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  _id: new mongoose.Types.ObjectId(),
  first_name: String,
  surname: String,
  email: String,
  username: String,
  pass_hash: String,
  city: String,
  country: String,
  age: Number,
  joined_at: new Date()
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
