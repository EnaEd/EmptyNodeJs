import koa from 'koa';

const app = new koa();

app.use(async ctx => {
  ctx.body('hello world');
});
console.log(`test envir = ${process.env['TEST']} 323`);
app.listen(3000, () =>
  console.log(`test envir = ${process.env['TEST']} 32`),
);
