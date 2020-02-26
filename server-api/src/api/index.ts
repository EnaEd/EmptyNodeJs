import koa from 'koa';

export const home = new koa();
home.use(async (ctx, next) => {
  await next();
  ctx.body = 'home page';
});

export const version = new koa();
version.use(async (ctx, next) => {
  await next();
  ctx.body = process.env.npm_package_version;
});
