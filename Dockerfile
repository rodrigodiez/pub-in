FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./

RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY ./platform/docker/nginx/templates/default.conf.template /etc/nginx/templates/default.conf.template

COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]