FROM node:10-alpine

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn --prod

# Bundle app source
COPY . .

EXPOSE 3000
CMD /wait && sh entrypoint.sh