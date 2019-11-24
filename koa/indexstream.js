const http = require("http");
const fs = require("fs");
const mime = require("./mime.json");
const path = require("path");

let server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/index") {
        res.setHeader("content-type", "text/html;charset=utf8");
        // let indexData =  fs.readFileSync("./views/index.html");
        // console.log(indexData.toString());
        // 流方式:节约性能；
        let rs = fs.createReadStream("./views/index.html");
        // res.write(indexData);
        rs.pipe(res);
    } else if (req.url === "/detail") {
        res.setHeader("content-type", "text/html;charset=utf8");
        // let detailData =  fs.readFileSync("./views/detail.html");
        // res.write(detailData);
        let rs = fs.createReadStream("./views/detail.html");
        rs.pipe(res);
    } else if (req.url === "/getData") {
        // 模拟接口；api  http://localhost:4000/getData
        let obj = {
            name: "张三",
            age: 20
        }
        res.write(JSON.stringify(obj));
        res.end();
    } else {
        let extName = path.extname(req.url);
        res.setHeader("content-type", mime[extName]);
        //    let cssData =  fs.readFileSync(__dirname+"/views"+req.url)
        //    res.write(cssData);
        let rs = fs.createReadStream(__dirname + "/views" + req.url);
        rs.pipe(res);
    }
    // 注意:流方式不要end；
    // res.end();
})

server.listen(4000);
