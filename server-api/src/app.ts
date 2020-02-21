import koa from 'koa';
import router from 'koa-router';
import api from './api/api';
import mount from 'koa-mount';

const app = new koa();
const rout = new router();

rout.get('/verson', api.version);
rout.get('*', api.home);

app.use(mount('', rout.middleware()));

app.listen(3000);
