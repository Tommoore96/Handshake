const Koa = require("koa");
const router = require("./router");
const koaBody = require("koa-body");
const logger = require("koa-logger");
const app = new Koa();

app.use(koaBody());
app.use(logger());

// response
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3002);
