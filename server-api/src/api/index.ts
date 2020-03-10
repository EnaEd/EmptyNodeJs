import { authenticated } from './../auth/authenticated';
import route from 'koa-router';
import koa from 'koa';

export const home = new koa();

const router = new route();

router.get('/version', authenticated, async (ctx, next) => {
  await next();
  ctx.body = process.env.npm_package_version;
});

router.get('/', async (ctx, next) => {
  await next();
  ctx.body = 'home page';
});

// home.use(async (ctx, next) => {
//   await next();
//   ctx.body = 'home page';
// });

home.use(router.routes()).use(router.allowedMethods());
