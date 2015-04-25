FROM node:0.10

COPY . /src

WORKDIR /src

RUN npm install
RUN npm run demo

EXPOSE 3000

CMD ["node", "server"]

