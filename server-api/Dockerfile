#Base
FROM node:12.16.1

WORKDIR /usr/app/server-api

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]