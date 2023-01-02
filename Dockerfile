FROM node:16

RUN mkdir /app

WORKDIR /app
COPY .yarn ./.yarn

COPY ./package.json ./yarn.lock

RUN corepack enable
RUN yarn install
COPY . /app/

EXPOSE 3000

CMD yarn start
