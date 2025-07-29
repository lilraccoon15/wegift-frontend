# Étape de build
FROM node:18-alpine as builder
WORKDIR /app

ARG VITE_BACKEND_URL_AUTH
ARG VITE_API_URL
ARG VITE_BACKEND_URL_WISHLIST
ARG VITE_BACKEND_URL_USER
ARG VITE_BACKEND_URL_EXCHANGE

ENV VITE_BACKEND_URL_AUTH=$VITE_BACKEND_URL_AUTH
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BACKEND_URL_WISHLIST=$VITE_BACKEND_URL_WISHLIST
ENV VITE_BACKEND_URL_USER=$VITE_BACKEND_URL_USER
ENV VITE_BACKEND_URL_EXCHANGE=$VITE_BACKEND_URL_EXCHANGE

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run prebuild
RUN npm run build

# Étape finale
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ✅ Healthcheck pour Railway
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD wget --no-verbose --tries=1 --spider http://localhost || exit 1
