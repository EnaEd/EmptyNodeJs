import koa from 'koa';

const app = new koa();

app.use(async ctx => {
  ctx.body = 'hello orld';
});

app.listen(3000);
