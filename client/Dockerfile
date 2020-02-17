# client/Dockerfile

# base image
FROM node:13.3.0-alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN npm install --production

# copy the client directory into the container
COPY . /usr/src/app
