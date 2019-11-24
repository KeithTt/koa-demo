const Koa = require('koa');
const Router = require('koa-router');
const Views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(Views(__dirname + '/views', {
    map: {
        html: 'pug',
    }
}));

router.get('/', async ctx => {
    // ctx.body = 'hello';
    let users = [{
        name: '张三',
        age: 18
    },
    {
        name: '李四',
        age: 19
    },
    {
        name: '王五',
        age: 20
    }]
    await ctx.render('index.pug', {
        data: "我是数据",
        users,
    });
});

app.use(router.routes());

app.listen(3000);
