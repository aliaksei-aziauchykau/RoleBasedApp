FROM node:latest

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

COPY . /app
RUN yarn --network-timeout 1000000000


ENV CONFIG_PATH="./env/.docker.env"

CMD [ "sh", "-c", "npm run server:run:clean"]	

EXPOSE 80