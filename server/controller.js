const UserModel = require("./model.js");

const controller = {};

controller.signUp = async (ctx, next) => {
  ctx.body = ctx.request.body;
  const newUser = new UserModel(ctx.request.body);
  newUser.save();
  ctx.status = 200;
};

module.exports = controller;
