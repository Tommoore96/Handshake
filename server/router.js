const Router = require("koa-router");
const router = new Router();
const controller = require("./controller.js");

router.get("/login", ctx => (ctx.body = "signin"));
router.post("/signup", controller.signUp);

module.exports = router;
