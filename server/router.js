const Router = require("koa-router");
const router = new Router();

router.get("/login", ctx => (ctx.body = "signin"));
router.post("signup", controller.signup);

module.exports = router;
