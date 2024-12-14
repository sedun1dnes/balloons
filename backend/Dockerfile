FROM node:18

WORKDIR /usr/src/app

RUN touch app.log

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run start > app.log 2>&1"]