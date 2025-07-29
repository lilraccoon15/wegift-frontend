# Étape de build
FROM node:18-alpine as builder

WORKDIR /app

# Build args injectés automatiquement par Railway
ARG VITE_BACKEND_URL_AUTH
ARG VITE_API_URL
ARG VITE_BACKEND_URL_WISHLIST
ARG VITE_BACKEND_URL_USER
ARG VITE_BACKEND_URL_EXCHANGE

# 🔁 Injection dans l'environnement pour node (prébuild)
ENV VITE_BACKEND_URL_AUTH=$VITE_BACKEND_URL_AUTH
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BACKEND_URL_WISHLIST=$VITE_BACKEND_URL_WISHLIST
ENV VITE_BACKEND_URL_USER=$VITE_BACKEND_URL_USER
ENV VITE_BACKEND_URL_EXCHANGE=$VITE_BACKEND_URL_EXCHANGE

# Dépendances
COPY package*.json ./
RUN npm install

# Code source
COPY . .

# 🌱 Génération du fichier clientEnv.ts
RUN npm run prebuild

# 🏗️ Build du projet (Vite utilisera les valeurs injectées dans clientEnv.ts)
RUN npm run build

# Étape finale : image nginx minimale pour servir le frontend
FROM nginx:stable-alpine

# Copie des fichiers buildés dans nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuration nginx personnalisée
COPY default.conf /etc/nginx/conf.d/default.conf
