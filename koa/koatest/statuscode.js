const Koa = require("koa");
const app = new Koa();

app.use(ctx => {
    // 成功 {status:1,info:'成功'}
    // 失败 {status:0,info:'失败'}
    // ctx.status = 404;
    ctx.status = 302; // 临时重定向
    ctx.set("location", "https://www.baidu.com");
    ctx.body = "hello";
});

app.listen(4000);