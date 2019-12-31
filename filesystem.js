// 1.文件操作  2.目录操作

const fs = require("fs");
const path = require("path");

// 文件操作
fs.writeFile("1.txt", "我是写入的文字", function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("写入成功");
})

// a:追加写 w:写入 r:读取
fs.writeFile("1.txt", "我是追加的文字", { flag: "a" }, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("写入成功");
})

// 文件读取
fs.readFile("1.txt", "utf8", (err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log(data);
})
fs.readFile("1.txt", (err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log(data.toString());
})

// 所有文件操作 没有加Sync都是异步 否则是同步；
let data = fs.readFileSync("1.txt");
console.log(data.toString());

// 修改（重命名）
fs.rename("1.txt", "2.txt", err => {
    if (err) {
        return console.log(err);
    }
    console.log("修改成功");
});

// 删除文件
fs.unlink("2.txt", (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("删除成功");
})

// 复制；先读取 再写入
fs.copyFile("index.html", "myindex.html", err => {
    if (err) {
        return console.log(err);
    }
    console.log("复制成功！");
})

// 复制
function mycopy(src, dest) {
    fs.writeFileSync(dest, fs.readFileSync(src));
}
mycopy("index.html", "test.html");

// 目录操作

// 创建目录
fs.mkdir("11", err => {
    if (err) {
        return console.log(err);
    }
    console.log("创建成功");
})

// 修改目录名称
fs.rename("11", "22", err => {
    if (err) {
        return console.log(err);
    }
    console.log("修改成功");
})

// 读取目录
fs.readdir("22", (err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log(data);
})

// 删除目录(空目录)
fs.rmdir("11", err => {
    if (err) {
        return console.log(err);
    }
    console.log("删除成功");
})

// 判断文件或者目录是否存在
fs.exists("index.html", exists => {
    console.log(exists);
})

// 获取文件或目录的状态信息
fs.stat("index.html", (err, stat) => {
    if (err) {
        return console.log(err);
    }
    // console.log(stat);
    // 判断文件是否是文件
    // let res = stat.isFile();
    // 是否是一个文件夹；
    let res = stat.isDirectory();
    console.log(res);
})

// 删除非空文件夹
// 先把目录里的文件删除, 再删除空目录
function removeDir(dirPath) {
    if (fs.existsSync(dirPath)) {
        let files = fs.readdirSync(dirPath);  // 读取文件夹中的文件
        for (let i = 0; i < files.length; i++) {
            const f = path.resolve(dirPath, files[i]);
            if (fs.statSync(f).isDirectory()) {
                removeDir(f); // 如果是目录，则递归删除
            } else {
                fs.unlinkSync(f); // 如果是文件，则直接删除文件
            }
        }

        fs.rmdirSync(dirPath);  // 删除空目录
    } else {
        console.log('该文件夹不存在: ' + dirPath);
    }
}
