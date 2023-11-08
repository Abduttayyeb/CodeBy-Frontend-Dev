FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
# Remove the default NGINX configuration file
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html


# Create a custom NGINX configuration to handle client-side routing
RUN echo "server {" > /etc/nginx/conf.d/default.conf
RUN echo "    listen 80;" >> /etc/nginx/conf.d/default.conf
RUN echo "    server_name localhost;" >> /etc/nginx/conf.d/default.conf
RUN echo "    location / {" >> /etc/nginx/conf.d/default.conf
RUN echo "        root /usr/share/nginx/html;" >> /etc/nginx/conf.d/default.conf
RUN echo "        try_files \$uri /index.html;" >> /etc/nginx/conf.d/default.conf
RUN echo "    }" >> /etc/nginx/conf.d/default.conf
RUN echo "}" >> /etc/nginx/conf.d/default.conf