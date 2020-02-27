import koa from 'koa';
import router from 'koa-route';
import jwt from 'jsonwebtoken';
import bodyParser from 'koa-bodyparser';
import user from './user';

export const auth = new koa();

const payload = { sub: 1 };
const secret = process.env.JWT_SECRET || 'secret';

auth.use(bodyParser());
auth.use(
  router.post('/signup', async (ctx, next) => {
    const { displayName, email, password } = ctx.request.body;

    if (!email) {
      ctx.throw(422, process.env.emailrequired);
    }
    if (!password) {
      ctx.throw(422, process.env.passwordRequired);
    }
    if (await user.findOne({ email: email })) {
      ctx.throw(422, process.env.userExists);
    }
    const newUser = new user({
      displayName: displayName,
      email: email,
      password: password,
    });
    newUser.save();
    const token = jwt.sign(payload, secret);
    ctx.body = `user->${newUser}\ntoken-> ${token}`;
  }),
);
