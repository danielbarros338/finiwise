FROM node:20.10-alpine

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

RUN apk update && apk upgrade
RUN apk add yarn

COPY . .
COPY ./.env.production ./.env

RUN yarn install
RUN yarn build

EXPOSE 3000
