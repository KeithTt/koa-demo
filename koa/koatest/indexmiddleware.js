const Koa = require("koa");
let app = new Koa();

// ctx: context简写（包含res和req）
let m1 = function (ctx, next) {
    console.log("m1start");
    // throw new Error("some error...");
    next();  //转交控制权给下一个中间件；m2();
    console.log("m1end");
}

let m2 = function (ctx, next) {
    console.log("m2start");
    next();
    console.log("m2end");
}

app.use(m1);
app.use(m2);

app.use(async ctx => {
    // 获取get查询参数；ctx.request.query
    console.log(ctx.request.query.age);
    // ctx.response  koa封装的res ctx.request koa封装的req
    // 3.别名；ctx.body(别名) 完整写法；ctx.response.body;
    // 4.中间件执行顺序；
    ctx.response.body = "hello world";
})

// 错误处理中间件
app.on("error", err => {
    console.log("??", err);
})

app.listen(3000);