import koa from "koa";
import router from "koa-router";

export const job = new koa();

const route = new router();

route.get("/list-scraper", async ctx => {
  ctx.body = "job-list-scrapper";
});

route.get("/item-scraper", async ctx => {
  ctx.body = "job-item-scrapper";
});

job.use(route.routes()).use(route.allowedMethods());
