const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const static = require("koa-static");
let app = new Koa();
let router = new Router();

app.use(views(__dirname + "/views", { //模板渲染
    extension: "pug"
}));

app.use(static(__dirname + "/static")); // 加载静态资源

router.get("/", async ctx => {
    ctx.body = "首页"
})

const newsData = require("./data/data.json"); // 引入数据

router.get("/index", async ctx => {
    await ctx.render("index", {
        newsData
    });
})

router.get("/detail", async ctx => {
    await ctx.render("detail", {
        newsData
    });
})

app.use(router.routes());

app.listen(4000);
