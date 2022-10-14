FROM node:lts

WORKDIR /usr/app

COPY ./api/package.json ./

COPY ./api/package-lock.json ./

RUN npm ci

COPY ./api/ .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]