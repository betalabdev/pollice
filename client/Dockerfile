# Build
FROM node:10-alpine as builder

ARG CLIENT_URL
ENV VUE_APP_CLIENT_URL ${CLIENT_URL}

ARG SERVER_URL
ENV VUE_APP_SERVER_URL ${SERVER_URL}

ARG CLIENT_ID
ENV VUE_APP_CLIENT_ID ${CLIENT_ID}

WORKDIR /code
COPY package.json .
COPY yarn.lock .

RUN yarn install --ignore-engines

COPY . .

RUN yarn build

# Copy to nginx
FROM nginx:alpine
WORKDIR /www
RUN rm -rf /usr/share/nginx/html/*

# Compress
RUN echo $'gzip on; \n\
gzip_proxied any; \n\
gzip_types text/plain text/xml text/css application/javascript; \n\
gzip_vary on; \n\
gzip_disable "MSIE [1-6]\.(?!.*SV1)";' > /etc/nginx/conf.d/gzip.conf

# Config for SAP app
RUN echo $'server { \n\
   listen       80; \n\
   server_name  localhost; \n\
   location / { \n\
       root   /usr/share/nginx/html; \n\
       index  index.html index.htm; \n\
       try_files $uri $uri/ /index.html; \n\
   } \n\
   error_page 400 500 502 503 504  /; \n\
}' > /etc/nginx/conf.d/default.conf

COPY --from=builder /code/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80