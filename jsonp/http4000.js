const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");

let app = new Koa();
let router = new Router();

app.use(static(__dirname + "/static"));

router.get("/", (ctx, next) => {
    ctx.body = "hello run at 4000";
})

router.get("/getAjax", (ctx, next) => {
    console.log("4000 run ");
    const cb = ctx.query.cb;
    // console.log(cb);
    // ctx.body = "var a = 20";
    const obj = {
        a: 20,
        b: 20
    }
    ctx.body = `${cb}(${JSON.stringify(obj)})`; // 将对象传给回调函数返回给前端执行
})

app.use(router.routes());

app.listen(4000);