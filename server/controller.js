const UserModel = require("./model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const controller = {};

controller.signUp = ctx => {
  const newUser = new UserModel(ctx.request.body);

  newUser.joined_at = new Date();

  bcrypt.hash(newUser.password, 10, function(err, hash) {
    newUser.password = hash;
    newUser.save();
  });

  const token = jwt.sign(ctx.request.body, "secretKey", {
    expiresIn: "32d"
  });

  ctx.cookies.set("Authorization", `Bearer ${token}`);

  ctx.status = 200;
};

controller.signIn = ctx => {
  const username = ctx.request.body.username,
    password = ctx.request.body.password,
    user = UserModel.findOne({ username: username });

  if (!user) {
    ctx.status = 401;
    return;
  }

  const match = bcrypt.compare(password, user.password);

  if (!match) {
    ctx.status = 401;
    return;
  }

  const token = jwt.sign(ctx.request.body, "secretKey", {
    expiresIn: "32d"
  });

  ctx.cookies.set("Authorization", `Bearer ${token}`);

  ctx.status = 200;
};

controller.details = ctx => {
  console.log("accepted");

  // jwt.verify(ctx.request.token, "secretKey", (err, authData) => {
  //   if (err) {
  //     ctx.body = err;
  //     ctx.status = 401;
  //   } else {
  //     ctx.body = `you're signed in!  ${authData}`;
  //   }
  // });
};

module.exports = controller;
