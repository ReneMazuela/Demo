FROM node:17-alpine as build

WORKDIR /app

COPY src/assets .
COPY package.json .
COPY package-lock.json .
COPY vite.config.js .

RUN npm install


COPY . .

CMD ["npm", "run", "build"]

RUN npm run build


FROM node:17-alpine

WORKDIR /app


COPY --from=build /app/dist ./dist
COPY package.json .
COPY package-lock.json .


RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]


