FROM node:14.15.0-alpine as app-challenge
LABEL maintainer="Alexandr Pushkin"

RUN mkdir /app

COPY backend  /app/backend
COPY frontend  /app/frontend
COPY package.json /app
COPY yarn.lock /app
COPY webpack.config.js /app
COPY webpack.server.config.js /app

RUN cd /app && yarn install
RUN cd /app && yarn run build:client && yarn run build:server

CMD ["node", "app/dist/server/index.js"]
