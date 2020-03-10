import koa from 'koa';
import mount from 'koa-mount';
import routerKoa from 'koa-router';
import * as api from './api';
import * as errorHandler from './error-handler';
import * as auth from './auth';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = new koa();
//const router = new routerKoa();

mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(errorHandler.handler);
//app.use(router.routes()).use(router.allowedMethods());

app.use(mount('/auth', auth.auth));
app.use(mount('/home', api.home));

app.listen(3000);
mongoose.connect(process.env['mongoConnectionString'], {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on('connected', function() {
  console.log(
    'Mongoose default connection open to ' +
      process.env['mongoConnectionString'],
  );
});
