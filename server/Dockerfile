#Sample Dockerfile for NodeJS Apps

FROM node:20


WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]