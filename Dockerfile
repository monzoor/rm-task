FROM node:12.16.1-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["./api/package.json", "./api/package-lock.json*", "./api/npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY ./api .
RUN ls
COPY ./client ./client
RUN cd ./client && npm i && npm run build
EXPOSE 8080
RUN npm i -g nodemon
CMD npm start