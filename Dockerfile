FROM quay.octanner.io/base/oct-node:6.9.1

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

CMD [ "node", "app.js" ]
