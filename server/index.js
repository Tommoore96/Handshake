const Koa = require("koa");
const router = require("./router");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const app = new Koa();

app.use(logger());
app.use(
  bodyParser({
    extendTypes: {
      json: ["application/x-javascript"] // will parse application/x-javascript type body as a JSON string
    }
  })
);

// response
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3002);
