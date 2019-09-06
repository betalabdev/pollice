FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn --prod

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["sh", "/entrypoint.sh"]