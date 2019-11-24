let http = require("http");

//创建一个server
let serve = http.createServer((req, res) => {
    res.write('hello world');
    res.end();
})

// 启动服务
serve.listen(3000);