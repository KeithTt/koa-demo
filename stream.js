// https://www.liaoxuefeng.com/wiki/1022910821149312/1023025800783232

const fs = require("fs");

// 同步读取文件
let res = fs.readFileSync("1.txt");
console.log(res.toString()); // 将 buffer 转换成 string

let rs = fs.createReadStream("1.txt");
let ws = fs.createWriteStream("2.txt");

// 管道 pipe
rs.pipe(ws); 

let num = 0;
let str = "";
rs.on("data", chunk => { // data事件可能会有多次，每次传递的chunk是流的一部分数据
    num++;
    str += chunk;
    // console.log(chunk);
    console.log(num);
})

rs.on("end", () => { // 传输结束
    console.log(str);
})

// 默认把数据分成64kb的小文件传输
// 创建一个65kb的文件
let buffer = Buffer.alloc(64 * 1024);
fs.writeFile("64kb", buffer, err => {
    if (err) {
        return console.log(err);
    }
    console.log("写入成功");
})