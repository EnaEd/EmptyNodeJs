import koa from 'koa';
import mount from 'koa-mount';
import * as api from './api';
import * as errorHandler from './error-handler';
import { throws } from 'assert';
import * as auth from './auth';

const app = new koa();

app.use(errorHandler.handler);

app.use(mount('/version', api.version));
app.use(mount('/home', api.home));
app.use(mount('/auth', auth.auth));
app.listen(3000);
