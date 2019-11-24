const koa = require("koa");
const views = require("koa-views");
const static = require("koa-static");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const md5 = require("md5");

const app = new koa();
const router = new Router();

const musicData = require("./data/music.json");

app.use(views(__dirname + "/views"), {
    map: {
        html: "pug"
    }
})

app.use(static(__dirname + "/static"));

app.use(bodyParser());

router.get("/login", async (ctx, next) => {
    const cookieInfo = ctx.cookies.get("isLogin"); // 获取 cookie
    if (cookieInfo) {
        const serverInfo = md5("张三" + "123");
        if (serverInfo === cookieInfo) { // 校验 cookie
            ctx.redirect("/list");
        }
    }
    await ctx.render("login.pug");
})

router.post("/checkUser", (ctx, next) => {
    // console.log(ctx.request.body); // 获取表单提交的数据
    if (ctx.request.body.username === "张三" && ctx.request.body.pwd === "123") {
        console.log(ctx.request.body);
        if (ctx.request.body.rememberMe) {
            // 储存登录成功的状态
            let loginStatus = md5("张三" + "123"); // 加密用户名和密码
            ctx.cookies.set("isLogin", loginStatus, { // 设置 cookie(key, value, options)
                maxAge: 3600 * 1000 * 24 * 7 //  过期时间,毫秒
            })
        }
        ctx.redirect("/list"); // 跳转到 list 页面
    }
    ctx.redirect("/error"); // 跳转到 error 页面
})

router.get("/list", async (ctx, next) => {
    await ctx.render("list.pug", {
        musicData // 将数据返回给前端
    });
})

router.get("/error", async (ctx, next) => {
    await ctx.render("error.pug");
})

//音乐详细页面
router.get("/detail", async (ctx, next) => {
    await ctx.render("detail.pug");
})

app.use(router.routes());

app.listen(3000);