const UserModel = require("./model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const token = jwt.sign({ foo: "bar" }, "shhhhh");

const controller = {};

controller.signUp = async (ctx, next) => {
  const newUser = new UserModel(ctx.request.body);

  newUser.joined_at = new Date();
  bcrypt.hash(newUser.password, 10, function(err, hash) {
    newUser.password = hash;
    newUser.save();
  });

  next();
  ctx.status = 200;
  ctx.body = token;
};

controller.signIn = async (ctx, next) => {
  const username = ctx.request.body.username;
  const password = ctx.request.body.password;

  const user = await UserModel.findOne({ username: username });

  const match = await bcrypt.compare(password, user.password);

  const obj = {};

  obj.token = await jwt.sign({ user: ctx.request.body }, "secretKey");

  ctx.cookies.set("Authorization", `Bearer ${obj.token}`);

  ctx.body = match ? obj : "No such user found.";
};

module.exports = controller;
