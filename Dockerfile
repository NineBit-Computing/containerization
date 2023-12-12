FROM node:18-alpine

ENV WEB_SERVER_PORT=9001 MONGO_NETWORK_HOST=mynet

WORKDIR /workspace

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci --production

COPY . .

EXPOSE 9001

CMD [ "node", "app.js"]

