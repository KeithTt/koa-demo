// koa  express 是nodejs的框架；轻量级；

const Koa = require("koa");
const app = new Koa();

app.use(ctx => {
    ctx.body = "hello world";
})

app.listen(3000);