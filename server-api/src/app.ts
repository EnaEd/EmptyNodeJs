import koa from 'koa';
import koaRouter from 'koa-router';
import mount from 'koa-mount';

const home = new koa();
home.use(async (ctx, next) => {
  await next();
  ctx.body = 'home page';
});

const version = new koa();
version.use(async (ctx, next) => {
  await next();
  ctx.body = process.env.npm_package_version;
});

const app = new koa();

app.use(mount('/version', version));
app.use(mount('/', home));

app.listen(3000);
