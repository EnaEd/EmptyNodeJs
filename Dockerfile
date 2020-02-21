#Base
FROM node:12.16.1-apline AS base
RUN mkdir /usr/app/server-api

COPY ./server-api/package.json /usr/app/server-api

WORKDIR /usr/app/server-api
RUN npm install

COPY ./server-api/tsconfig.json /usr/app/server-api
COPY ./server-api/nodemon.json /usr/app/server-api
COPY ./server-api/.env /usr/app/server-api

CMD ["/hello"]