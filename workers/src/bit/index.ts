import koa from "koa";
import router from "koa-router";

export const bit = new koa();

const route = new router();

route.get("/bit-scraper", async ctx => {
  ctx.body = "bit-crapper";
});

bit.use(route.routes()).use(route.allowedMethods());
