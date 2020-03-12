#Base
FROM node:12.16.1

WORKDIR /usr/app/workers

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3010

CMD ["npm", "run", "start:prod"]