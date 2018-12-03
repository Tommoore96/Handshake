const Koa = require("koa");
const app = new Koa();
const router = require("./router");

// response
app.use(router.routes());

app.listen(3001);
