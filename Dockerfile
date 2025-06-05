FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm config set progress=false
RUN npm config set cache /tmp/npm-cache --global

RUN npm install

COPY . .

ARG VITE_BACKEND_URL_USER

ENV VITE_BACKEND_URL_USER=$VITE_BACKEND_URL_USER

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
