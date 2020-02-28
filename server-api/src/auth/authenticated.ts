import jwt from 'jsonwebtoken';

export const authenticated = async (ctx: any, next: any) => {
  if (!ctx.headers.authorization) {
    ctx.throw(403, process.env.noToken);
  }

  const token = ctx.headers.authorization.split(' ')[1];
  try {
    ctx.request.jwtPayload = jwt.verify(token, process.env.jwtSecret);
    console.log(
      `now->${new Date()}\nexp->${ctx.request.jwtPayload.exp}`,
    );
  } catch (err) {
    ctx.throw(err.status || 401, process.env.unauthorized);
  }
  await next();
};
