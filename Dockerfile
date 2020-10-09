FROM node:13.8.0-alpine
ENV NODE_ENV production
ENV DATABASE_HOST mongo:27017
WORKDIR /usr/src/app
RUN npm cache clean --force
COPY ./api .
RUN rm -rf node_modules
RUN yarn

COPY ./client ./client
RUN ls
RUN cd ./client && yarn && yarn build
EXPOSE 8080
RUN yarn global add nodemon --prefix /usr/local
CMD yarn start