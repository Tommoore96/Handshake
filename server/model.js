const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const db = require("./db.js");
const Schema = mongoose.Schema;

const User = new Schema({
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String, minlength: 6, require: true },
  joined_at: Number,
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

User.methods.generateAuthToken = async function() {
  const user = this,
    access = "auth",
    token = await jwt
      .sign({ _id: user._id.toHexString(), access }, "secretKey", {
        expiresIn: "32d"
      })
      .toString();

  user.tokens.concat({ access, token });
  console.log("token: ", user.tokens);

  return user.save().then(() => {
    return token;
  });
};

User.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.joined_at;

  console.log(({ _id, email } = userObject));

  return ({ _id, email } = userObject);
};

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
