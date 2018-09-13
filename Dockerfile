FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/dist

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Get bash since alpine doesn't have it
RUN apk update && apk add bash

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "npm", "start" ]