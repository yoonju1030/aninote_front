FROM node:18
WORKDIR /app

COPY package.json yarn.lock ./

ADD . .
RUN yarn install
CMD ["yarn", "serve"]