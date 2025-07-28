# Étape de build
FROM node:18-alpine as builder

WORKDIR /app

# Build args injectés par Railway
ARG VITE_BACKEND_URL_AUTH
ARG VITE_API_URL
ARG VITE_BACKEND_URL_WISHLIST
ARG VITE_BACKEND_URL_USER
ARG VITE_BACKEND_URL_EXCHANGE

# Injection dans l'environnement
ENV VITE_BACKEND_URL_AUTH=$VITE_BACKEND_URL_AUTH
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BACKEND_URL_WISHLIST=$VITE_BACKEND_URL_WISHLIST
ENV VITE_BACKEND_URL_USER=$VITE_BACKEND_URL_USER
ENV VITE_BACKEND_URL_EXCHANGE=$VITE_BACKEND_URL_EXCHANGE

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Étape finale
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
