const Koa = require("koa");
const router = require("./router");
const koaBody = require("koa-body");
const logger = require("koa-logger");
const app = new Koa();

const port = process.env.PORT || 3002;

app.use(koaBody());
app.use(logger());

// response
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);
