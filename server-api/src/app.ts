import koa from 'koa';
import mount from 'koa-mount';
import * as api from './api';
import * as errorHandler from './error-handler';
import * as auth from './auth';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = new koa();
mongoose.Promise = Promise; // Просим Mongoose использовать стандартные Промисы
mongoose.set('debug', true); // Просим Mongoose писать все запросы к базе в консоль. Удобно для отладки кода
mongoose.connect('mongodb://localhost/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(errorHandler.handler);

app.use(mount('/version', api.version));
app.use(mount('/home', api.home));
app.use(mount('/auth', auth.auth));

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
