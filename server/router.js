const Router = require("koa-router");
const router = new Router();
const controller = require("./controller.js");

router.post("/login", controller.signIn);
router.post("/signup", controller.signUp);

function verifyToken(ctx, next) {
  // Get auth header value
  const bearerHeader = ctx.request.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    ctx.request.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    ctx.status = 403;
  }
}

module.exports = router;
