import { bit } from "./bit/index";
import { job } from "./job/index";
import koa from "koa";
import { handler } from "./error-handler";
import mount from "koa-mount";

const app = new koa();

app.use(handler);

app.use(mount("/job", job));
app.use(mount("/bit", bit));

app.listen(3010, () => {
  console.log(`server start on 3010`);
});
