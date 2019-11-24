const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
const koaBody = require("koa-body");
const fs = require("fs");
const usersData = require("./data/users.json");
// console.log(usersData);

const app = new Koa();
const router = new Router();

app.use(static(__dirname + "/static"));

app.use(koaBody({
  multipart: true // 允许上传文件
}));

router.get("/", (ctx, next) => {
  ctx.body = "hello"; // 返回的数据
})

router.get("/checkUserName", (ctx, next) => {
  console.log(ctx.query.username); // 查询参数
  let res = usersData.find(item => item.username === ctx.query.username); // 查询用户是否存在
  if (res) {
    ctx.body = {
      status: 1, // 如果存在，则返回 1
      info: "用户名正确"
    };
  } else {
    ctx.body = {
      status: 2, // 如果不存在，则返回 2
      info: "用户名错误"
    };
  }
})

router.get("/get/:id", (ctx, next) => { // 动态路由
  console.log(ctx.params); // { id: '4' }
  ctx.body = {
    status: 1,
    info: "请求成功"
  }
})

router.post("/post", (ctx, next) => {
  console.log(ctx.request.body); // 这里需要使用 koa-body 解析提交过来的数据
  ctx.body = {
    status: 1,
    info: "post请求成功"
  }
})

router.get("/xml", (ctx, next) => {
  // ctx.set("content-type","text/xml");
  ctx.body = `<?xml version='1.0' encoding='utf-8' ?>
                    <books>
                        <nodejs>
                            <name>nodejs实战</name>
                            <price>56元</price>
                        </nodejs>
                        <react>
                            <name>react入门</name>
                            <price>50元</price>
                        </react>
                    </books>`
})

router.post("/upload", (ctx, next) => {
  console.log(ctx.request.body);
  // console.log(ctx.request.files); // 是一个对象
  console.log(ctx.request.files.img);
  const fileData = fs.readFileSync(ctx.request.files.img.path); // 读取文件
  fs.writeFileSync("static/imgs/" + ctx.request.files.img.name, fileData); // 将文件写入本地
  ctx.body = "请求成功";
})

router.post("/fileUpload", (ctx, next) => {
  console.log(ctx.request.files);
  const fileData = fs.readFileSync(ctx.request.files.myfile.path); 
  fs.writeFileSync("static/imgs/" + ctx.request.files.myfile.name, fileData); 
  ctx.body = "请求成功";
})

app.use(router.routes());

app.listen(3000);