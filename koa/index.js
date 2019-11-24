// 1.原生node如何区分路由？？（后端路由）
// 2.原生node如何加载页面？？  (性能问题：stream)； 
// 3.原生node如何加载第三方资源？？？
// 单页面应用（无刷新）spa vue-router 、 react-router；
// express ---> koa;

const http = require("http");
const fs = require("fs");
const mime = require("./mime.json"); // require 会自动将 json 转换成对象，不需要手动解析
const path = require("path");

let server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/index") {
        res.setHeader("content-type", "text/html;charset=utf8"); // 设置字符编码
        let indexData = fs.readFileSync("./views/index.html");
        // console.log(indexData.toString());
        res.write(indexData);
    } else if (req.url === "/detail") {
        res.setHeader("content-type", "text/html;charset=utf8");
        let detailData = fs.readFileSync("./views/detail.html");
        res.write(detailData);
    } else if (req.url === "/getData") {
        const obj = {
            name: "张三",
            age: 20
        }
        res.write(JSON.stringify(obj));
    } else {
        // 加载第三方资源
        // console.log(req.url);
        let extName = path.extname(req.url); // 获取文件后缀
        res.setHeader("content-type", mime[extName]); // 动态设置文件类型
        let cssData = fs.readFileSync(__dirname + "/views" + req.url) //动态设置文件路径
        res.write(cssData);
    }
    res.end();
})

server.listen(4000);
