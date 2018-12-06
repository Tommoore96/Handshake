const Koa = require("koa");
const router = require("./router");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const app = new Koa();
const cors = require("@koa/cors");

app.use(logger());
app.use(
  bodyParser({
    extendTypes: {
      json: ["application/json"] // will parse application/x-javascript type body as a JSON string
    }
  })
);

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// response
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3002);
