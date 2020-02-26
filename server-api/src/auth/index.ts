import koa from 'koa';
import router from 'koa-route';
import jwt from 'jsonwebtoken';

export const auth = new koa();

const payload = { sub: 1 };
const secret = process.env.JWT_SECRET || 'secret';

auth.use(
  router.post('/', async (ctx, next) => {
    const token = jwt.sign(payload, secret);
    ctx.body = token;
  }),
);
