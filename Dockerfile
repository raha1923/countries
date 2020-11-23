FROM node:10.18.1-alpine3.10 as builder

ENV NODE_ENV production
ENV HOST 0.0.0.0

WORKDIR /home/node
COPY . .

RUN yarn install && yarn cache clean
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
