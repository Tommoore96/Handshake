const Router = require("koa-router");
const router = new Router();
const controller = require("./controller.js");
const UserModel = require("./model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", controller.signIn);
router.post("/signup", controller.signUp);

router.get("/details", verifyToken, controller.details);

function verifyToken(ctx, next) {
  // Get auth header value
  const bearerHeader = ctx.request.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" "),
      bearerToken = bearer[1],
      decoded = jwt.verify(bearerToken, "secretKey"),
      username = decoded.username,
      password = decoded.password,
      user = UserModel.findOne({ username: username });

    if (!user) {
      ctx.status = 401;
      return;
    }

    bcrypt.compare(password, user.password, (err, ctx) => {
      if (err) {
        console.log(err);
        ctx.status = 401;
        return;
      } else {
        next();
      }
    });
  } else {
    // Forbidden
    ctx.status = 401;
  }
}

module.exports = router;
