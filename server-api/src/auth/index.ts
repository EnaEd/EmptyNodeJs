import koa from 'koa';
import router from 'koa-route';

import bodyParser from 'koa-bodyparser';
import user from './user';

export const auth = new koa();

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
    (newUser as any).setPassword(password);
    newUser.save();
    const payload = {
      subjectId: newUser.id,
      name: displayName,
      email: email,
    };
    const token = (newUser as any).generateJWT();
    ctx.body = `${newUser}\n${token}`;
  }),
);
auth.use(
  router.post('/signin', async (ctx, next) => {
    const { displayName, email, password } = ctx.request.body;
    if (!email) {
      ctx.throw(422, process.env.emailrequired);
    }
    if (!password) {
      ctx.throw(422, process.env.passwordRequired);
    }
    const loggedUser = await user.findOne({ email: email });
    if (!loggedUser) {
      ctx.throw(422, process.env.userNotExists);
    }
    if (!(loggedUser as any).checkPassword(password)) {
      ctx.throw(401, process.env.unauthorized);
    }
    const token = (loggedUser as any).generateJWT();
    ctx.body = `${loggedUser}\n${token}`;
  }),
);
