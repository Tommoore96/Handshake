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
  const bearerHeader = ctx.request.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" "),
      bearerToken = bearer[1],
      decoded = jwt.verify(bearerToken, "secretKey"),
      user = UserModel.findOne({ username: decoded.username });

    if (!user) {
      ctx.status = 401;
      return;
    }

    bcrypt.compare(decoded.password, user.password, err => {
      if (err) {
        console.log(err);
        return;
      } else {
        next();
      }
    });
  } else {
    ctx.status = 401;
  }
}

module.exports = router;
