const UserModel = require("./model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const token = jwt.sign({ foo: "bar" }, "shhhhh");
const db = require("./db");

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

  UserModel.findOne({ username: username })
    .then(function(user) {
      console.log(user);
      return bcrypt.compare(password, user.password);
    })
    .then(function(samePassword) {
      console.log("samePassword: ", samePassword);
      if (!samePassword) {
        ctx.status = 403;
      } else {
        ctx.status = 200;
      }
      console.log("status ", ctx.status);
    })
    .catch(function(error) {
      console.log("Error authenticating user: ");
      console.log(error);
      next();
    });

  ctx.status = 200;

  // const req = ctx.request.body,
  // const password;

  // bcrypt.genSalt(10, function(err, salt) {
  //   bcrypt.hash(ctx.request.body.password, salt, function(err, hash) {
  //     password = hash;
  //   });
  // });
  // UserModel.findOne({username: req.username, password: password});
};

module.exports = controller;
