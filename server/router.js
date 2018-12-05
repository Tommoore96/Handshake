const Router = require("koa-router");
const router = new Router();
const controller = require("./controller.js");

router.get("/login", controller.signIn);
router.post("/signup", controller.signUp);

module.exports = router;
