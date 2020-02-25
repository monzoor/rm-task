FROM node:13.8.0-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN npm cache clean --force
COPY ["./api/package.json", "./api/package-lock.json*", "./api/npm-shrinkwrap.json*", "./"]
RUN yarn && mv node_modules ../
COPY ./api .
RUN ls
COPY ./client ./client
RUN cd ./client && yarn add eslint && yarn && yarn build
EXPOSE 8080
RUN yarn global add nodemon --prefix /usr/local
CMD yarn start