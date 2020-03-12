export const handler = async (ctx: any, next: any) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    console.log(err.message);
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
};
